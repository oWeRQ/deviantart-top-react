define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var GalleryStore = require('stores/GalleryStore');
	var GalleriesStore = require('stores/GalleriesStore');
	var Keypress = require('Keypress');
	var utils = require('utils');

	return React.createClass({
		displayName: 'Gallery',

		mixins: [Reflux.connect(GalleryStore)],

		inputHandler: function(e){
			if (e.target.name === 'galleries[]') {
				var gallery = GalleriesStore.getByTitle(e.target.value);
				if (e.target.checked) {
					Actions.imagesAdd(gallery, [this.state.image]);
				} else {
					Actions.imagesRemove(gallery, [this.state.image]);
				}
			}
		},

		deleteHandler: function(e){
			e.preventDefault();

			Actions.imagesDelete([this.state.image]);
		},

		componentDidMount: function(){
			this.listener = new Keypress.Listener();

			this.keys = this.listener.register_many([
				{keys: 'esc', on_keydown: Actions.galleryClose},
				{keys: 'q', on_keydown: Actions.galleryClose},
				{keys: 'e', on_keydown: Actions.galleryUpdate},
				{keys: 'left', on_keydown: Actions.galleryPrev},
				{keys: 'a', on_keydown: Actions.galleryPrev},
				{keys: 'right', on_keydown: Actions.galleryNext},
				{keys: 'd', on_keydown: Actions.galleryNext},
				{keys: 'w', on_keydown: function(){
					Actions.imagesSelect(this.state.image, true);
					Actions.galleryNext();
				}.bind(this)},
				{keys: 's', on_keydown: function(){
					Actions.imagesSelect(this.state.image, false);
					Actions.galleryNext();
				}.bind(this)},
				{keys: 'delete', on_keydown: function(){
					Actions.imagesDelete([this.state.image]);
				}.bind(this)},
			]);
		},

		componentWillUnmount: function(){
			this.listener.destroy();
		},

		componentDidUpdate: function(prevProps, prevState){
			var wrap = this.refs.thumbsWrap.getDOMNode();
			var ul = wrap.querySelector('ul');
			var li = wrap.querySelector('li:nth-child(' + (GalleryStore.getIndex() + 1) + ')');

			if (ul && li) {
				ul.style.left = -(li.offsetLeft - wrap.offsetWidth / 2 + li.offsetWidth / 2) + 'px';
			}
		},

		render: function(){
			if (this.listener) {
				if (this.state.visible)
					this.listener.listen();
				else
					this.listener.stop_listening();
			}

			document.body.classList.toggle('m-gallery', this.state.visible);

			return (
				<div className="b-gallery" style={{display: this.state.visible ? '' : 'none'}}>
					{this.state.info ? <div className="b-gallery-info">
						<h4>
							<a target="_blank" href={this.state.image.page} title={this.state.image.titlefull}>
								{this.state.image.title}
							</a>
						</h4>
						<form onChange={this.inputHandler}>
							<div class="checkboxes">
								{GalleriesStore.list.map(function(gallery, i){
									return (
										<label>
											<input type="checkbox" name="galleries[]" checked={this.state.image.galleries.indexOf(gallery.title) !== -1} value={gallery.title} />
											<span className="m-color" style={{backgroundColor: utils.str2color(gallery.title, 90, 35)}} />
											<span className="m-text">{gallery.title}</span>
										</label>
									);
								}, this)}
							</div>
						</form>
						<p>
							{this.state.image.categories.join(', ')}
						</p>
						<p>
							{this.state.image.date}
						</p>
						<p>
							<a target="_blank" href={'http://' + this.state.image.username + '.deviantart.com/gallery/'}>
								{this.state.image.nickname}
							</a>
						</p>
						<p>
							<a onClick={this.deleteHandler}>Delete Favourite</a>
						</p>
					</div> : null}
					<div className="b-gallery-main">
						<a className="b-gallery-close" onClick={Actions.galleryClose}></a>
						<a className="b-gallery-update" onClick={Actions.galleryUpdate}></a>
						<div className="b-gallery-imageWrap">
							<img className="b-gallery-image" src={rootUrl + 'images/original/' + this.state.image.filename} />
						</div>
						<a className="b-gallery-prev" onClick={Actions.galleryPrev}></a>
						<a className="b-gallery-next" onClick={Actions.galleryNext}></a>
						<div className="b-gallery-thumbsWrap" ref="thumbsWrap">
							<ul className="b-gallery-thumbs">
								{this.state.author.images.map(function(image, i){
									return (
										<li key={image.id}>
											<a onClick={Actions.galleryShow.bind(null, image)}>
												<img className={(this.state.image === image ? 'm-active' : '') + (image.selected ? ' m-selected' : '')} src={rootUrl + 'images/mythumbs/' + image.filename} />
											</a>
										</li>
									);
								}, this)}
							</ul>
						</div>
					</div>
				</div>
			);
		}
	});
});
