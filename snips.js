var vueh = null;

var colors = {
	green : '#3CCC4E',
	yellow : '#FFDC3A',
	red : '#FA0033',
	white : '#FFF'
};

$(function() {
	//$('#mn-dump-list').bind('input propertychange', updateTopo);

	vueh = new Vue({
		el : '#app-snips',
		data : {
			posts : [],
			searchedPosts: [],
			dataPrefix : 'data:text/markdown;base64, ',
			searchTerm : ''
		},
		computed : {

		},
		methods : {
			search : function(ev) {
				var self = this;
				console.log(self.searchTerm);
				self.searchedPosts = self.posts.filter(function(post) {
					if(!!~post.tags.indexOf(self.searchTerm)) return true;
					var re = new RegExp(self.searchTerm, "ig");
					var md = atob(post.md.substr(self.dataPrefix.length));
					if(md.match(re)) return true;
				});
			}
		},
		updated : function() {
			var zmdlist = document.getElementsByClassName('md');
			for (var i = 0; i < zmdlist.length; i++) {
				zmdlist[i].render();
			}

		},
		mounted : function() {
			var self = this;
			var client = new XMLHttpRequest();
			client.open('GET', 'https://raw.githubusercontent.com/mortrevere/snips/master/build/main.json');
			client.onreadystatechange = function() {
				if (client.responseText) {
					posts = JSON.parse(client.responseText);
					posts.snips = posts.snips.map(function(post) {
						post.md = self.dataPrefix + post.md;
						return post;
					});
					self.posts = posts.snips;
				}
			};
			client.send();
		}
	});

});

var ajax = {
	base : 'http://',
	call : function(method, URI, data, callback, onerror) {
		var o = {
			method : method,
			url : this.base + URI
		};

		/*var token = cookies.get('X-Token');

		 if (token) {
		 o.headers = {
		 'X-Token' : token
		 };
		 }*/

		if ( typeof data === 'function') {
			onerror = callback;
			callback = data;
		} else if ( typeof data === 'object') {
			o.data = data;
		}

		function cbwrap(data) {
			data = data.value ? data.value : data;
			if (callback)
				callback(data);
		}

		function failwrap(data) {
			if (data.status === 401 && app.logout)
				app.logout();

			if (onerror)
				onerror(data);
		}

		setTimeout(function() {
			$.ajax(o).done(cbwrap).fail(failwrap);
		}, 500);

	}
};
