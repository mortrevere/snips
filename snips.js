const SOURCES = ['https://raw.githubusercontent.com/mortrevere/snips/master/build/main.json', 'https://raw.githubusercontent.com/LysandreJik/snips/master/build/main.json']

var colors = {
	green: '#3CCC4E',
	yellow: '#FFDC3A',
	red: '#FA0033',
	white: '#FFF'
};


var vueh = new Vue({
	el: '#app-snips',
	data: {
		posts: [],
		searchedPosts: [],
		dataPrefix: 'data:text/markdown;base64, ',
		searchTerm: '',
		relevanceThreshold : 9,
		minNumberOfResults : 2,
		relevantSearchResultsCount : 0
	},
	computed: {
		availableTags: function () {
			tagsF = {};
			this.posts.forEach(function (post) {
				post.tags.forEach(function (tag) {
					if (tagsF[tag] === undefined)
						tagsF[tag] = 1;
					else
						tagsF[tag]++;
				})
			});
			return Object.keys(tagsF).map(function (tag) {
				return { value: tag };
			}).sort(function (prev, next) {
				return tagsF[prev.value] < tagsF[next.value];
			}).slice(0, 42);
		}
	},
	methods: {
		search: function (ev) {
			var self = this;
			if (typeof ev === "string")
				self.searchTerm = ev;
			if (self.searchTerm.length < 2) return;

			var relevance = [];
			var searchTerms = self.searchTerm.split(' ');

			self.searchedPosts = self.posts.filter(function (post) {
				var relevanceScore = searchTerms.reduce(function (prev, next) {
					if (!!~post.tags.indexOf(next)) return prev + 10 - searchTerms.length;
					else return prev;
				}, 0);
				
				if (self.searchTerm.length > 3) {
					var re = new RegExp('.*' + self.searchTerm, "ig");
					var md = atob(post.md.substr(self.dataPrefix.length));
					var match = md.match(re);
					//console.log(match);
					if (match) relevanceScore += (match[0][0] == '#' ? 7 : 3);
				}
				if(relevanceScore) {
					relevance.push(relevanceScore);
					return true;
				}
			});

			if (Math.max(...relevance) < 10) relevance = relevance.map(function (r) { return r + 10; });
			self.searchedPosts = self.searchedPosts.map(function (post, i) {
				post.relevance = relevance[i];
				return post;
			}).sort(function (prev, next) {
				return prev.relevance < next.relevance;
			});
			
			//lower the relevance threshold to include next result(s) when finding too few matches (helps weighting poorly tagged snips)
			if(relevance.filter(function(r) { return r >= self.relevanceThreshold}).length < self.minNumberOfResults && relevance.length >= self.minNumberOfResults) {
				self.relevanceThreshold = relevance.sort(function(a,b) { return b-a; })[self.minNumberOfResults-1];
			}
			self.relevantSearchResultsCount = relevance.filter(function(r) { return r >= self.relevanceThreshold; }).length;
	
			window.location.hash = self.searchTerm;
		},
		clearSearch: function () {
			this.searchTerm = '';
			window.location.hash = '';
			history.pushState(null, null, ' '); //remove the hash from the URL
		},
		fetchPosts: async function () {
			const postsPromises = SOURCES.map(source =>
				fetch(source).then(res => res.status === 200 ? res.json() : Promise.resolve(undefined)),
			);

			this.posts = (await Promise.all(postsPromises))
				.flatMap((posts, sourceIdx) => {
					if (posts === undefined) {
						return;
					}

					const source = SOURCES[sourceIdx];
					const from = {
						username: this.usernameFromSourceURL(source),
						url: this.githubRepoFromSourceURL(source),
					};

					return posts.snips.map((post) => {
						post.md = this.dataPrefix + post.md;
						post.from = from;
						return post;
					});
				})
				.sort((prev, next) => prev.date < next.date);
		},
		usernameFromSourceURL: function (url) {
			return url.split('https://raw.githubusercontent.com/').pop().split('/')[0];
		},
		githubRepoFromSourceURL: function (url) {
			return 'https://github.com/' + url.split('https://raw.githubusercontent.com/').pop().split('master/build/main.json')[0];
		}
	},
	updated: function () {
		var zmdlist = document.getElementsByClassName('md');
		for (var i = 0; i < zmdlist.length; i++) {
			zmdlist[i].render();
		}
	},
	mounted: function () {
		this.fetchPosts().then(() => {
			if (window.location.hash) {
				setTimeout(() => {
					this.searchTerm = decodeURIComponent(window.location.hash.substr(1));
					this.search();
				}, 300);
			}
		});
	}
});
