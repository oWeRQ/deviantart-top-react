define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var jQuery = require('jquery');

	return Reflux.createStore({
		listenables: [Actions],

		init: function(){
			this.list = [];
		},

		getInitialState: function () {
			return this.list;
		},

		getByTitle: function(title){
			for (var i = 0; i < this.list.length; i++) {
				if (this.list[i].title === title)
					return this.list[i];
			}
		},

		onLoadGalleries: function(){
			jQuery.ajax({
				url: rootUrl,
				data: {
					ajax: 1,
					action: 'getGalleries'
				},
				dataType: 'json',
				success: function(result){
					this.list = result.galleries;
					this.trigger(this.list);
					Actions.setGalleries(this.list);
				}.bind(this)
			});
		}
	});
});