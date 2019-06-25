const SOURCES = [
  'https://raw.githubusercontent.com/mortrevere/snips/master/build/main.json',
  'https://raw.githubusercontent.com/LysandreJik/snips/master/build/main.json',
];

/* eslint-disable-next-line no-new */
new Vue({
  el: '#app-snips',
  data: {
    posts: [],
    searchedPosts: [],
    dataPrefix: 'data:text/markdown;base64, ',
    searchTerm: '',
    relevanceThreshold: 9,
    minNumberOfResults: 2,
    relevantSearchResultsCount: 0,
  },
  computed: {
    availableTags() {
      const tagsF = {};
      this.posts.forEach((post) => {
        post.tags.forEach((tag) => {
          if (tagsF[tag] === undefined) {
            tagsF[tag] = 1;
          } else {
            tagsF[tag] += 1;
          }
        });
      });
      return Object.keys(tagsF)
        .map(tag => ({ value: tag }))
        .sort((prev, next) => tagsF[prev.value] < tagsF[next.value])
        .slice(0, 42);
    },
  },
  updated() {
    const zmdlist = document.getElementsByClassName('md');
    Array.from(zmdlist).forEach((zmd) => { zmd.render(); });
  },
  mounted() {
    this.fetchPosts().then(() => {
      if (window.location.hash) {
        setTimeout(() => {
          this.searchTerm = decodeURIComponent(window.location.hash.substr(1));
          this.search();
        }, 300);
      }
    });
  },
  methods: {
    search(ev) {
      const self = this;
      if (typeof ev === 'string') self.searchTerm = ev;
      if (self.searchTerm.length < 2) return;

      let relevance = [];
      const searchTerms = self.searchTerm.split(' ');

      self.searchedPosts = self.posts.filter((post) => {
        let relevanceScore = searchTerms.reduce((prev, next) => {
          if (~post.tags.indexOf(next)) {
            return prev + 10 - searchTerms.length;
          }
          return prev;
        }, 0);

        if (self.searchTerm.length > 3) {
          const re = new RegExp(`.*${self.searchTerm}`, 'ig');
          const md = atob(post.md.substr(self.dataPrefix.length));
          const match = md.match(re);
          // console.log(match);
          if (match) relevanceScore += (match[0][0] === '#' ? 7 : 3);
        }
        if (relevanceScore) {
          relevance.push(relevanceScore);
          return true;
        }

        return false;
      });

      if (Math.max(...relevance) < 10) relevance = relevance.map(r => r + 10);
      self.searchedPosts = self.searchedPosts.map((post, i) => {
        post.relevance = relevance[i];
        return post;
      }).sort((prev, next) => prev.relevance < next.relevance);

      // lower the relevance threshold to include next result(s) when finding
      // too few matches (helps weighting poorly tagged snips)
      if (relevance.filter(r => r >= self.relevanceThreshold).length < self.minNumberOfResults
        && relevance.length >= self.minNumberOfResults) {
        self.relevanceThreshold = relevance.sort((a, b) => b - a)[self.minNumberOfResults - 1];
      }
      self.relevantSearchResultsCount = relevance.filter(r => r >= self.relevanceThreshold).length;

      window.location.hash = self.searchTerm;
    },
    clearSearch() {
      this.searchTerm = '';
      window.location.hash = '';
      history.pushState(null, null, ' '); // remove the hash from the URL
    },
    async fetchPosts() {
      const postsPromises = SOURCES.map(async (source) => {
        const res = await fetch(source);
        if (!res.ok) {
          return null;
        }

        const posts = await res.json();
        const from = {
          username: this.usernameFromSourceURL(source),
          url: this.githubRepoFromSourceURL(source),
        };

        return posts.snips.map((post) => {
          post.md = this.dataPrefix + post.md;
          post.from = from;
          return post;
        });
      });

      this.posts = (await Promise.all(postsPromises))
        .filter(posts => posts !== null)
        .flat()
        .sort((prev, next) => prev.date < next.date);
    },
    usernameFromSourceURL(url) {
      return url.split('https://raw.githubusercontent.com/').pop().split('/')[0];
    },
    githubRepoFromSourceURL(url) {
      return `https://github.com/${url.split('https://raw.githubusercontent.com/').pop().split('master/build/main.json')[0]}`;
    },
  },
});
