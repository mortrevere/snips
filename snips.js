const SOURCES  = ['https://raw.githubusercontent.com/mortrevere/snips/master/build/main.json']


var vueh = null;
var colors = {
	green: '#3CCC4E',
	yellow: '#FFDC3A',
	red: '#FA0033',
	white: '#FFF'
};

$(function () {
	//$('#mn-dump-list').bind('input propertychange', updateTopo);

	vueh = new Vue({
		el: '#app-snips',
		data: {
			posts: [],
			searchedPosts: [],
			dataPrefix: 'data:text/markdown;base64, ',
			searchTerm: '',
			sourceIndex: -1
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
				});
			}
		},
		methods: {
			search: function (ev) {
				var self = this;
				if(typeof ev === "string")
					self.searchTerm = ev;
				relevance = [];
				self.searchedPosts = self.posts.filter(function (post) {
					if (!!~post.tags.indexOf(self.searchTerm)) {
						relevance.push(10)
						return true;
					}
					var re = new RegExp(self.searchTerm, "ig");
					var md = atob(post.md.substr(self.dataPrefix.length));
					if (md.match(re)) {
						relevance.push(3)
						return true;
					}
				});
				if(Math.max(...relevance) < 10) relevance = relevance.map(function(r) { return r+10; });
				self.searchedPosts = self.searchedPosts.map(function(post, i) {
					post.relevance = relevance[i];
					return post;
				}).sort(function(prev, next) {
					return prev.relevance < next.relevance;
				});
			},
			clearSearch: function() {
				this.searchTerm = '';
			},
			getNextSource: function() {
				this.sourceIndex++;
				return SOURCES[this.sourceIndex];
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
			client.open('GET', self.getNextSource());
			client.onreadystatechange = function () {
				if (client.responseText) {
					posts = JSON.parse(client.responseText);
					posts.snips = posts.snips.map(function (post) {
						post.md = self.dataPrefix + post.md;
						return post;
					}).sort(function (prev, next) {
						console.log(prev.date, next.date);
						return prev.date < next.date;
					});
					self.posts = posts.snips;
				}
				//client.open('GET', self.getNextSource());
			};
			client.send();
		}
	});

});