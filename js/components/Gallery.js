define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var GalleryStore = require('stores/GalleryStore');

	return React.createClass({
		mixins: [Reflux.connect(GalleryStore)],

		render: function(){
			return (
				<div className="b-gallery" style={{display: this.state.visible ? '' : 'none'}}>
					<a className="b-gallery-close" onClick={Actions.galleryClose}></a>
					<div className="b-gallery-imageWrap">
						<img className="b-gallery-image" src={this.state.src} />
						<a className="b-gallery-prev" onClick={Actions.galleryPrev}></a>
						<a className="b-gallery-next" onClick={Actions.galleryNext}></a>
					</div>
					<div className="b-gallery-thumbsWrap">
						<ul className="b-gallery-thumbs">
							{this.state.images.map(function(image, i){
								return (
									<li key={image.id}>
										<a onClick={Actions.galleryShow.bind(null, image)}>
											<img className={this.state.idx === i ? 'm-active' : null} src={'images/mythumbs/' + image.filename} />
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