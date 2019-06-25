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
		sourceIndex: 0,
		currentSource: ''
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
			relevance = [];
			self.searchedPosts = self.posts.filter(function (post) {
				if (!!~post.tags.indexOf(self.searchTerm)) {
					relevance.push(10)
					return true;
				}
				var re = new RegExp('.*' + self.searchTerm, "ig");
				var md = atob(post.md.substr(self.dataPrefix.length));
				var match = md.match(re);
				console.log(match);
				if (match) {
					if (match[0][0] == '#') //if matched on a markdown header
						relevance.push(7)
					else
						relevance.push(3)
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
			window.location.hash = self.searchTerm;
		},
		clearSearch: function () {
			this.searchTerm = '';
		},
		getNextSource: function () {
			if (this.sourceIndex < SOURCES.length - 1) {
				this.sourceIndex++;
				return SOURCES[this.sourceIndex];
			} else return false;
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
		var self = this;
		var client = new XMLHttpRequest();
		self.currentSource = SOURCES[0];

		client.onreadystatechange = function () {
			if (client.responseText && self.currentSource) {
				posts = JSON.parse(client.responseText);
				posts.snips = posts.snips.map(function (post) {
					post.md = self.dataPrefix + post.md;
					post.from = { username: self.usernameFromSourceURL(self.currentSource), url: self.githubRepoFromSourceURL(self.currentSource) }
					return post;
				});
				self.posts = self.posts.concat(posts.snips).sort(function (prev, next) {
					return prev.date < next.date;
				}); //to fix -> sort only once after all fetch (but Vue is acting up)
				self.currentSource = self.getNextSource();
			}
		};

		client.onload = function () {
			if (self.currentSource) {
				client.open('GET', self.currentSource);
				client.send();
			} else {
				//done
				if (window.location.hash) {
					setTimeout(function () {
						self.searchTerm = window.location.hash.substr(1);
						self.search();
					}, 300);
				}
			}
		}

		client.open('GET', self.currentSource);
		client.send();
	}
});
