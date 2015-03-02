define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var GalleryStore = require('stores/GalleryStore');
	var Keypress = require('Keypress');

	return React.createClass({
		displayName: 'Gallery',

		mixins: [Reflux.connect(GalleryStore)],

		componentDidMount: function(){
			this.listener = new Keypress.Listener();

			this.keys = this.listener.register_many([
				{keys: 'esc', on_keydown: Actions.galleryClose},
				{keys: 'q', on_keydown: Actions.galleryClose},
				{keys: 'left', on_keydown: Actions.galleryPrev},
				{keys: 'a', on_keydown: Actions.galleryPrev},
				{keys: 'right', on_keydown: Actions.galleryNext},
				{keys: 'd', on_keydown: Actions.galleryNext},
				{keys: 'w', on_keydown: function(){
					Actions.imagesSelect(this.state.images[this.state.idx], true);
					Actions.galleryNext();
				}.bind(this)},
				{keys: 's', on_keydown: function(){
					Actions.imagesSelect(this.state.images[this.state.idx], false);
					Actions.galleryNext();
				}.bind(this)},
			]);
		},

		componentWillUnmount: function(){
			this.listener.unregister_many(this.keys);
		},

		componentDidUpdate: function(prevProps, prevState){
			var wrap = this.refs.thumbsWrap.getDOMNode();
			var ul = wrap.querySelector('ul');
			var li = wrap.querySelector('li:nth-child(' + (this.state.idx + 1) + ')');

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

			return (
				<div className="b-gallery" style={{display: this.state.visible ? '' : 'none'}}>
					<a className="b-gallery-close" onClick={Actions.galleryClose}></a>
					<div className="b-gallery-imageWrap">
						<img className="b-gallery-image" src={this.state.src} />
						<a className="b-gallery-prev" onClick={Actions.galleryPrev}></a>
						<a className="b-gallery-next" onClick={Actions.galleryNext}></a>
					</div>
					<div className="b-gallery-thumbsWrap" ref="thumbsWrap">
						<ul className="b-gallery-thumbs">
							{this.state.images.map(function(image, i){
								return (
									<li key={image.id}>
										<a onClick={Actions.galleryShow.bind(null, image)}>
											<img className={(this.state.idx === i ? 'm-active' : '') + (image.selected ? ' m-selected' : '')} src={'images/mythumbs/' + image.filename} />
										</a>
									</li>
								);
							}, this)}
						</ul>
					</div>
				</div>
			);
		}
	});
});