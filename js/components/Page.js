define(['react', 'jsx!./Images'], function(React, Images){
	return React.createClass({
		render: function() {
			return (
				<div className="b-pages-item" data-num={this.props.page}>
					{this.props.authors.map(function(author, i){
						return <Images onActivateImages={this.props.onActivateImages} key={author.username} author={author} num={this.props.topOffset + i + 1} baseUrl={this.props.baseUrl} />;
					}, this)}
				</div>
			);
		}
	});
});