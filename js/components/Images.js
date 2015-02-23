define(['jquery', 'react', 'jsx!./Image'], function($, React, Image){
	return React.createClass({
		getInitialState: function(){
			return {
				images: this.props.author.images,
				active: false
			};
		},

		componentWillMount: function(){
			console.log('Images.componentWillMount', this.key, this.props.key);
		},

		moreImagesClick: function(e){
			e.preventDefault();

			$.ajax({
				url: this.props.baseUrl,
				type: 'post',
				dataType: 'json',
				data: {
					username: this.props.author.username,
					imagesOffset: this.state.images.length,
					ajax: 1
				},
				success: function(result) {
					this.setState({
						images: this.state.images.concat(result.authors[0].images)
					});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.props.baseUrl, status, err.toString());
				}.bind(this)
			});
		},

		activate: function(){
			this.setState({
				active: true
			});
			this.props.onActivateImages(this);
		},

		deactivate: function(){
			this.setState({
				active: false
			});
		},

		render: function(){
			var moreImagesCount = this.props.author.favourites - this.state.images.length;
			var images = this.state.images.map(function(image){
				return <Image key={image.id} {...image} />;
			});

			return (
				<div className={React.addons.classSet({'b-images': true, 'm-active': this.state.active})} onClick={this.activate}>
					<div className="b-images-actions">
						<span className="m-button m-down i-checkAll"><input className="i-checkAll-checkbox" type="checkbox" /></span>
						<span className="m-button m-down i-addGallery" data-action="addGallery">Add Collection</span>
						<span className="m-button m-down i-removeGallery" data-action="removeGallery">Remove Collection</span>
						<span className="m-button i-deleteFavourite">Delete Favourites</span>
					</div>
					<h3>
						<span className="b-images-number">{this.props.num}</span>
						<a target="_blank" href="">{this.props.author.username}</a>
						<small>
							{this.props.author.favourites}
							/ {this.props.author.deviations}
							= {this.props.author.percent.toFixed(1)}%
							| Score: {this.props.author.score.toFixed(1)}
							| Wilson Score: {(this.props.author.wilson_score * 100).toFixed(1)}
						</small>
						<sup><a target="_blank" href={'http://' + this.props.author.username + '.deviantart.com/gallery/'}>DA</a></sup>
					</h3>
					<ul className="b-inline b-images-list">
						{images}
					</ul>
					{moreImagesCount > 0 ? <a href="#" onClick={this.moreImagesClick} className="m-moreImages">More Images (<span className="count">{moreImagesCount}</span>)</a> : null}
				</div>
			);
		}
	});
});