define(['jquery', 'react', 'jsx!./Page'], function($, React, Page){
	return React.createClass({
		getInitialState: function(){
			return {
				disabled: false,
				totalPages: 0,
				startPage: 0,
				endPage: 0,
				baseUrl: null,
				prevUrl: null,
				nextUrl: null,
				pages: [],
			};
		},

		activeImages: null,

		componentWillReceiveProps: function(nextProps){
			if (nextProps.url !== this.props.url)
				this.fetch(nextProps.url);
		},

		fetch: function(url){
			this.setState({
				disabled: true
			});

			$.ajax({
				url: url,
				dataType: 'json',
				success: function(result){
					this.setState({
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
					});
				}.bind(this),
				error: function(xhr, status, err){
					console.error('Pages.fetch', status, err.toString());
				}.bind(this)
			});
		},

		prevPageClick: function(e){
			e.preventDefault();
 
			$.ajax({
				url: rootUrl + this.state.prevUrl + '&ajax=1',
				dataType: 'json',
				success: function(result) {
					this.state.pages.unshift({
						authors: result.authors,
						page: result.page,
						topOffset: result.topOffset
					});
					this.setState({
						prevUrl: result.prevUrl,
						startPage: result.page,
						pages: this.state.pages
					});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.state.prevUrl, status, err.toString());
				}.bind(this)
			});
		},

		nextPageClick: function(e){
			e.preventDefault();

			$.ajax({
				url: rootUrl + this.state.nextUrl + '&ajax=1',
				dataType: 'json',
				success: function(result) {
					this.state.pages.push({
						authors: result.authors,
						page: result.page,
						topOffset: result.topOffset
					});
					this.setState({
						nextUrl: result.nextUrl,
						endPage: result.page,
						pages: this.state.pages
					});
				}.bind(this),
				error: function(xhr, status, err) {
					console.error(this.state.nextUrl, status, err.toString());
				}.bind(this)
			});
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