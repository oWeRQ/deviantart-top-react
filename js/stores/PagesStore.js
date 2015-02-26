define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var jQuery = require('jquery');

	return Reflux.createStore({
		listenables: [Actions],

		filter: {},
		
		getInitialState: function () {
			this.state = {
				disabled: false,
				totalPages: 0,
				startPage: 0,
				endPage: 0,
				baseUrl: null,
				prevUrl: null,
				nextUrl: null,
				pages: []
			};
			return this.state;
		},

		getAuthors: function(){
			var authors = {};

			this.state.pages.forEach(function(page, i){
				page.authors.forEach(function(author, i){
					authors[author.username] = author;
				});
			});

			return authors;
		},

		getAuthor: function(username){
			for (var i = 0, pages = this.state.pages; i < pages.length; i++) {
				for (var j = 0; j < pages[i].authors.length; j++) {
					if (pages[i].authors[j].username === username)
						return pages[i].authors[j];
				}
			}
		},

		onLoad: function(filter){
			this.filter = jQuery.extend(true, {ajax: 1}, filter);

			this.state.disabled = true;
			this.trigger({
				disabled: true
			});

			jQuery.ajax({
				url: rootUrl,
				data: this.filter,
				type: 'post',
				dataType: 'json',
				success: function(result){
					this.state = {
						disabled: false,
						totalPages: result.pages,
						startPage: result.page,
						endPage: result.page,
						baseUrl: result.baseUrl,
						prevUrl: result.prevUrl,
						nextUrl: result.nextUrl,
						pages: [
							{
								authors: result.authors,
								page: result.page,
								topOffset: result.topOffset
							}
						]
					};
					this.trigger(this.state);
				}.bind(this),
				error: function(xhr, status, err){
					console.error('PagesStore.onLoad', url, status, err.toString());
				}.bind(this)
			});
		},

		onLoadPrev: function(){
			var data = jQuery.extend({}, this.filter, {
				page: this.state.startPage - 1
			});

			jQuery.ajax({
				url: rootUrl,
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(result) {
					this.state.startPage = result.page;
					this.state.prevUrl = result.prevUrl;
					this.state.pages.unshift({
						authors: result.authors,
						page: result.page,
						topOffset: result.topOffset
					});
					this.trigger(this.state);
				}.bind(this),
				error: function(xhr, status, err) {
					console.error('PagesStore.onLoadPrev', this.state.prevUrl, status, err.toString());
				}.bind(this)
			});
		},

		onLoadNext: function(){
			var data = jQuery.extend({}, this.filter, {
				page: this.state.endPage + 1
			});

			jQuery.ajax({
				url: rootUrl,
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(result) {
					this.state.endPage = result.page;
					this.state.nextUrl = result.nextUrl;
					this.state.pages.push({
						authors: result.authors,
						page: result.page,
						topOffset: result.topOffset
					});
					this.trigger(this.state);
				}.bind(this),
				error: function(xhr, status, err) {
					console.error('PagesStore.onLoadNext', this.state.nextUrl, status, err.toString());
				}.bind(this)
			});
		},

		onLoadMore: function(username){
			var author = this.getAuthor(username);

			var data = jQuery.extend({
				username: author.username,
				imagesOffset: author.images.length
			}, this.filter);

			jQuery.ajax({
				url: rootUrl,
				data: data,
				type: 'post',
				dataType: 'json',
				success: function(result) {
					author.images.push.apply(author.images, result.authors[0].images);
					this.trigger(this.state);
				}.bind(this),
				error: function(xhr, status, err) {
					console.error('PagesStore.onLoadMore', status, err.toString());
				}.bind(this)
			});
		}
	});
});
