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
			searchTerm: ''
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
				self.searchedPosts = self.posts.filter(function (post) {
					if (!!~post.tags.indexOf(self.searchTerm)) return true;
					var re = new RegExp(self.searchTerm, "ig");
					var md = atob(post.md.substr(self.dataPrefix.length));
					if (md.match(re)) return true;
				});
			},
			clearSearch: function() {
				this.searchTerm = '';
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
			client.open('GET', 'https://raw.githubusercontent.com/mortrevere/snips/master/build/main.json');
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
			};
			client.send();
		}
	});

});