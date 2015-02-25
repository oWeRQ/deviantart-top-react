define(function(require){
	var jQuery = require('jquery');
	var Reflux = require('reflux');
	var Actions = require('Actions');

	return Reflux.createStore({
		listenables: [Actions],
		
		getInitialState: function () {
			this.state = {
				disabled: false,
				totalPages: 0,
				startPage: 0,
				endPage: 0,
				baseUrl: null,
				prevUrl: null,
				nextUrl: null,
				pages: [],
			};
			return this.state;
		},

		onLoad: function(filter){
			this.state.disabled = true;
			this.trigger({
				disabled: true
			});

			jQuery.ajax({
				url: rootUrl + '?ajax=1',
				data: filter,
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
			jQuery.ajax({
				url: rootUrl + this.state.prevUrl + '&ajax=1',
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
			jQuery.ajax({
				url: rootUrl + this.state.nextUrl + '&ajax=1',
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
		}
	});
});
