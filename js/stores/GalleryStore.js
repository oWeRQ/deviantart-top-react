define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var PagesStore = require('stores/PagesStore');

	return Reflux.createStore({
		listenables: [Actions],

		getInitialState: function(){
			this.state = {
				visible: false,
				info: false,
				author: {
					username: null,
					favourites: 0,
					images: []
				},
				image: {}
			};

			return this.state;
		},

		getIndex: function(){
			return this.state.author.images.indexOf(this.state.image);
		},

		onImagesChange: function(){
			this.trigger(this.state);
		},

		onGalleryClose: function(){
			this.state.visible = false;

			this.trigger(this.state);
		},

		onGalleryUpdate: function(){
			this.state.info = !this.state.info;

			this.trigger(this.state);
		},

		onGalleryShow: function(image){
			this.state.visible = true;
			this.state.author = PagesStore.getAuthor(image.author);
			this.state.image = image;

			this.trigger(this.state);

			Actions.imagesCursor(image);

			if (this.state.author.images.length < this.state.author.favourites
				&& this.state.author.images.length <= this.getIndex() + 3)
			{
				Actions.loadMore(this.state.author.username);
			}
		},

		onGalleryPrev: function(){
			var newIdx = this.getIndex() - 1;
			if (newIdx < 0)
				newIdx = this.state.author.images.length - 1;
			Actions.galleryShow(this.state.author.images[newIdx]);
		},

		onGalleryNext: function(){
			var newIdx = this.getIndex() + 1;
			if (newIdx >= this.state.author.images.length)
				newIdx = 0;
			Actions.galleryShow(this.state.author.images[newIdx]);
		},

		onLoadMoreComplete: function(author){
			if (this.state.author.username === author.username)
				this.trigger(this.state);
		}
	});
});
