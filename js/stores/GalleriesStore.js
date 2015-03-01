define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var jQuery = require('jquery');

	return Reflux.createStore({
		listenables: [Actions],

		getInitialState: function () {
			//console.log('GalleriesStore.getInitialState', this);
			this.list = [];
			return this.list;
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