define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var jQuery = require('jquery');

	return Reflux.createStore({
		listenables: [Actions],

		filter: {},

		getInitialState: function(){
			this.state = {
				disabled: false,
				totalPages: 0,
				startPage: 0,
				endPage: 0,
				baseUrl: null,
				prevUrl: null,
				nextUrl: null,
				selectedAuthor: null,
				selectedImage: null,
				pages: []
			};
			return this.state;
		},

		getSelectedImages: function(){
			if (!this.state.selectedAuthor)
				return [];

			return this.state.selectedAuthor.images.filter(function(image){
				return !!image.selected;
			});
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

		getImage: function(id){
			for (var i = 0, pages = this.state.pages; i < pages.length; i++) {
				for (var j = 0; j < pages[i].authors.length; j++) {
					for (var k = 0; k < pages[i].authors[j].images.length; k++) {
						if (pages[i].authors[j].images[k].id === id)
							return pages[i].authors[j].images[k];
					}
				}
			}
		},

		deleteImage: function(id){
			for (var i = 0, pages = this.state.pages; i < pages.length; i++) {
				for (var j = 0; j < pages[i].authors.length; j++) {
					for (var k = 0; k < pages[i].authors[j].images.length; k++) {
						if (pages[i].authors[j].images[k].id === id) {
							pages[i].authors[j].images.splice(k, 1);
							return pages[i].authors[j];
						}
					}
				}
			}
			return false;
		},

		onLoad: function(filter){
			if (this.jqxhr)
				this.jqxhr.abort();

			window.location.hash = jQuery.param(filter);

			this.filter = jQuery.extend(true, {ajax: 1}, filter);

			this.state.disabled = true;
			this.trigger({
				disabled: true
			});

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: this.filter,
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
					console.error('PagesStore.onLoad', status, err.toString());
				}.bind(this)
			});
		},

		onLoadPrev: function(){
			if (this.state.disabled)
				return;

			this.state.disabled = true;

			var data = jQuery.extend({}, this.filter, {
				page: this.state.startPage - 1
			});

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: data,
				dataType: 'json',
				success: function(result) {
					this.state.disabled = false;
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
					console.error('PagesStore.onLoadPrev', status, err.toString());
				}.bind(this)
			});
		},

		onLoadNext: function(){
			if (this.state.disabled)
				return;

			this.state.disabled = true;

			var data = jQuery.extend({}, this.filter, {
				page: this.state.endPage + 1
			});

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: data,
				dataType: 'json',
				success: function(result) {
					this.state.disabled = false;
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
					console.error('PagesStore.onLoadNext', status, err.toString());
				}.bind(this)
			});
		},

		onLoadMore: function(username){
			if (this.state.disabled)
				return;

			this.state.disabled = true;

			var author = this.getAuthor(username);

			var data = jQuery.extend({
				username: author.username,
				imagesOffset: author.images.length
			}, this.filter);

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: data,
				dataType: 'json',
				success: function(result) {
					author.images.push.apply(author.images, result.authors[0].images);
					this.state.disabled = false;
					this.trigger(this.state);
					Actions.loadMoreComplete(author);
				}.bind(this),
				error: function(xhr, status, err) {
					console.error('PagesStore.onLoadMore', status, err.toString());
				}.bind(this)
			});
		},

		onAuthorSelect: function(author){
			if (this.state.selectedAuthor === author)
				return;

			if (this.state.selectedAuthor)
				this.state.selectedAuthor.selected = false;

			author.selected = true;

			this.state.selectedAuthor = author;

			this.trigger(this.state);
		},

		onImagesSelect: function(image, selected){
			if (selected !== undefined)
				image.selected = selected;
			else
				image.selected = !image.selected;

			this.state.selectedImage = image;

			this.trigger(this.state);
		},

		onImagesSelectTo: function(image){
			var author = this.getAuthor(image.author);
			var idx = author.images.indexOf(image);
			var lastIdx = author.images.indexOf(this.state.selectedImage);
			var i;

			if (idx > lastIdx) {
				for (i = idx; i >= lastIdx; i--)
					author.images[i].selected = this.state.selectedImage.selected;
			} else {
				for (i = idx; i <= lastIdx; i++)
					author.images[i].selected = this.state.selectedImage.selected;
			}

			this.trigger(this.state);
		},

		onImagesSelectAll: function(option){
			if (option.select === 'all' || option.select === 'none') {
				this.state.selectedAuthor.images.forEach(function(image){
					image.selected = (option.select === 'all');
				});
			} else {
				this.state.selectedAuthor.images.forEach(function(image){
					image.selected = !image.selected;
				});
			}

			this.trigger(this.state);
		},

		onImagesAdd: function(gallery, images){
			if (!Array.isArray(images))
				images = this.getSelectedImages();

			if (images.length === 0)
				return;

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: {
					action: 'AddGallery',
					gallery: gallery.galleryid,
					images: images.map(function(image){
						return image.id;
					})
				},
				type: 'post',
				dataType: 'json',
				success: function(result){
					result.images.forEach(function(image){
						jQuery.extend(this.getImage(image.id), image);
					}.bind(this));
					this.trigger(this.state);
					Actions.imagesChange();
				}.bind(this),
				error: function(xhr, status, err){
					console.error('PagesStore.onImagesAdd', status, err.toString());
				}.bind(this)
			});
		},

		onImagesRemove: function(gallery, images){
			if (!Array.isArray(images))
				images = this.getSelectedImages();

			if (images.length === 0)
				return;

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: {
					action: 'RemoveGallery',
					gallery: gallery.galleryid,
					images: images.map(function(image){
						return image.id;
					})
				},
				type: 'post',
				dataType: 'json',
				success: function(result){
					result.images.forEach(function(image){
						jQuery.extend(this.getImage(image.id), image);
					}.bind(this));
					this.trigger(this.state);
					Actions.imagesChange();
				}.bind(this),
				error: function(xhr, status, err){
					console.error('PagesStore.onImagesAdd', status, err.toString());
				}.bind(this)
			});
		},

		onImagesDelete: function(images){
			if (!Array.isArray(images))
				images = this.getSelectedImages();

			if (images.length === 0)
				return;

			var confirmed = confirm('Delete ' + images.length + ' images: ' + images.map(function(image){
				return '"' + image.title + '"';
			}).join(', ') + '?');

			if (confirmed !== true)
				return;

			this.jqxhr = jQuery.ajax({
				url: rootUrl,
				data: {
					action: 'deleteFavorites',
					images: images.map(function(image){
						return image.id;
					})
				},
				type: 'post',
				dataType: 'json',
				success: function(result){
					result.images.forEach(function(image){
						var author = this.deleteImage(image.id);
						if (author)
							author.favourites--;
					}.bind(this));
					this.trigger(this.state);
					Actions.imagesChange();
				}.bind(this),
				error: function(xhr, status, err){
					console.error('PagesStore.onImagesAdd', status, err.toString());
				}.bind(this)
			});
		},

		onImagesCursor: function(image){
			this.state.selectedAuthor.cursor = image;

			this.trigger(this.state);
		}
	});
});
