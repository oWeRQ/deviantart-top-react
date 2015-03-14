define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var UndoStore = require('stores/UndoStore');

	return React.createClass({
		displayName: 'Undo',

		mixins: [Reflux.connect(UndoStore)],

		render: function(){
			if (this.state.actions.length === 0)
				return null;

			return (
				<div className="b-undo">
					<span className="b-undo-description">
						{this.state.actions[this.state.actions.length-1].description}
					</span>
					<button onClick={Actions.undo} className="m-button">Undo</button>
				</div>
			);
		},
	});
});
