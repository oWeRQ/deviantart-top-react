define(function(require){
	var React = require('react');
	var Actions = require('Actions');
	var Image = require('jsx!./Image');

	return React.createClass({
		getInitialState: function(){
			return {
				active: false
			};
		},

		moreHandler: function(e){
			e.preventDefault();

			Actions.loadMore(this.props.author.username);
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
			var moreCount = this.props.author.favourites - this.props.author.images.length;
			var images = this.props.author.images.map(function(image){
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
					{moreCount > 0 ? <a href="#" onClick={this.moreHandler} className="m-moreImages">More Images (<span className="count">{moreCount}</span>)</a> : null}
				</div>
			);
		}
	});
});