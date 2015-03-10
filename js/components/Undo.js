define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var UndoStore = require('stores/UndoStore');

	return React.createClass({
		displayName: 'Undo',

		mixins: [Reflux.connect(UndoStore)],

		render: function(){
			return (
				<div className="b-undo" style={{display: this.state.actions.length ? '' : 'none'}}>
					<ul>
						{this.state.actions.map(function(action){
							return <li>{action.description}</li>;
						})}
					</ul>
					<button onClick={Actions.undo}>Undo</button>
				</div>
			);
		},
	});
});
