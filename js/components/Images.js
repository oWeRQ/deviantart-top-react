define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var GalleriesStore = require('stores/GalleriesStore');
	var Select = require('jsx!./Select');
	var Image = require('jsx!./Image');

	return React.createClass({
		displayName: 'Images',

		mixins: [Reflux.connect(GalleriesStore, 'galleriesList')],

		authorHandler: function(e){
			e.preventDefault();

			Actions.filterValue('title', 'by:' + this.props.author.username);
		},

		moreHandler: function(e){
			e.preventDefault();

			Actions.loadMore(this.props.author.username);
		},

		render: function(){
			var moreCount = this.props.author.favourites - this.props.author.images.length;
			var imagesSelected = 0;
			var images = this.props.author.images.map(function(image){
				if (image.selected)
					imagesSelected++;
				return <Image onClick={Actions.galleryShow.bind(this, image)} key={image.id} image={image} />;
			}, this);

			return (
				<div className={React.addons.classSet({'b-images': true, 'm-active': this.props.author.selected})} onClick={Actions.authorSelect.bind(null, this.props.author)}>
					<div className="b-images-actions">
						<Select onChange={Actions.imagesSelectAll} text={
							<input type="checkbox" onChange={Actions.imagesSelectAll.bind(null, {select: 'invert'})} checked={this.props.author.images.length === imagesSelected} />
						} options={[
							{
								title: 'All',
								select: 'all'
							},
							{
								title: 'Invert',
								select: 'invert'
							},
							{
								title: 'None',
								select: 'none'
							}
						]} />
						<Select onChange={Actions.imagesAdd} text="Add Collection" options={this.state.galleriesList} />
						<Select onChange={Actions.imagesRemove} text="Remove Collection" options={this.state.galleriesList} />
						<span onClick={Actions.imagesDelete} className="m-button">Delete Favourites</span>
					</div>
					<h3>
						<span className="b-images-number">{this.props.num}</span>
						<a target="_blank" onClick={this.authorHandler} href={window.location.pathname + '#username=' + this.props.author.username}>{this.props.author.username}</a>
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