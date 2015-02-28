define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var PagesStore = require('stores/PagesStore');

	return Reflux.createStore({
		listenables: [Actions],

		getInitialState: function(){
			this.state = {
				visible: false,
				username: null,
				src: null,
				idx: -1,
				totalImages: 0,
				images: []
			};

			return this.state;
		},

		onGalleryClose: function(){
			this.state.visible = false;

			this.trigger(this.state);
		},

		onGalleryShow: function(image){
			var author = PagesStore.getAuthor(image.author);

			this.state.visible = true;
			this.state.username = image.author;
			this.state.src = 'images/original/' + image.filename;
			this.state.idx = author.images.indexOf(image);
			this.state.totalImages = author.favourites;
			this.state.images = author.images;

			this.trigger(this.state);

			if (this.state.images.length < this.state.totalImages
				&& this.state.images.length <= this.state.idx + 3)
			{
				Actions.loadMore(this.state.username);
			}
		},

		onGalleryPrev: function(){
			var newIdx = this.state.idx - 1;
			if (newIdx < 0)
				newIdx = this.state.images.length - 1;
			Actions.galleryShow(this.state.images[newIdx]);
		},

		onGalleryNext: function(){
			var newIdx = this.state.idx + 1;
			if (newIdx >= this.state.images.length)
				newIdx = 0;
			Actions.galleryShow(this.state.images[newIdx]);
		}
	});
});