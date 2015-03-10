define(function(require){
	var Reflux = require('reflux');
	var Actions = require('Actions');

	return Reflux.createStore({
		listenables: [Actions],

		init: function(){
			this.state = {
				actions: [],
			};
		},

		getInitialState: function(){
			return this.state;
		},

		onUndoPush: function(description, undo){
			this.state.actions.push({
				description: description,
				undo: undo,
			});
			this.trigger(this.state);
		},

		onUndo: function(){
			var action = this.state.actions.pop();
			action.undo();
			this.trigger(this.state);
		},
	});
});
