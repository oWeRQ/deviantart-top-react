define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var PagesStore = require('stores/PagesStore');
	var Page = require('jsx!./Page');

	return React.createClass({
		mixins: [Reflux.connect(PagesStore)],

		activeImages: null,

		prevPageClick: function(e){
			e.preventDefault();

			Actions.loadPrev();
		},

		nextPageClick: function(e){
			e.preventDefault();

			Actions.loadNext();
		},

		onActivateImages: function(images){
			if (this.activeImages)
				this.activeImages.deactivate();

			this.activeImages = images;
		},

		render: function() {
			var baseUrl = rootUrl + this.state.baseUrl;

			return (
				<div className={React.addons.classSet({'b-pages': true, 'm-disabled': this.state.disabled})}>
					{this.state.startPage > 1 ? <div className="b-pages-head">
						<a onClick={this.prevPageClick} href={this.state.prevUrl} className="m-button i-showPrev">Show Prev</a>
					</div> : null}

					<div className="b-pages-list">
						{this.state.pages.map(function(page, i){
							return <Page onActivateImages={this.onActivateImages} key={page.page} authors={page.authors} page={page.page} topOffset={page.topOffset} baseUrl={baseUrl} />;
						}, this)}
					</div>

					{this.state.endPage < this.state.totalPages ? <div className="b-pages-foot">
						<a onClick={this.nextPageClick} href={this.state.nextUrl} className="m-button i-showMore">Show More</a>
					</div> : null}
				</div>
			);
		}
	});
});