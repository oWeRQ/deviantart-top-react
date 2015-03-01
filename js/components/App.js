define(function(require){
	var React = require('react');
	var Filter = require('jsx!components/Filter');
	var Pages = require('jsx!components/Pages');
	var Gallery = require('jsx!components/Gallery');

	return React.createClass({
		displayName: 'App',

		render: function(){
			return (
				<div className="l-wrap">
					<div className="l-sidebar">
						<Filter />
					</div>

					<div className="l-content">
						<Pages />
					</div>

					<Gallery />
				</div>
			);
		}
	});
});