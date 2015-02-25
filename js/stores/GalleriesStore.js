define(function(require){
	var jQuery = require('jquery');
	var Reflux = require('reflux');
	var Actions = require('Actions');

	return Reflux.createStore({
		listenables: [Actions],

		getInitialState: function () {
			this.list = [];
			return this.list;
		},

		onLoadGalleries: function(){
			jQuery.ajax({
				url: rootUrl + '?ajax=1&action=getGalleries',
				dataType: 'json',
				success: function(result){
					this.list = result.galleries;
					this.trigger(this.list);
				}.bind(this)
			});
		}
	});
});