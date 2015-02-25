define(function(require){
	var React = require('react');

	return React.createClass({
		render: function() {
			return (
				<div className="b-pages-item" data-num={this.props.num}>
					{this.props.children}
				</div>
			);
		}
	});
});