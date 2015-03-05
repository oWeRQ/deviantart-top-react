define(function(require){
	var React = require('react');

	return React.createClass({
		displayName: 'TextInput',

		clearHandler: function(e){
			e.preventDefault();

			var input = this.refs.input.getDOMNode();
			input.value = this.props.defaultValue;
			React.addons.TestUtils.Simulate.change(input, {target: input});
		},

		render: function(){
			return (
				<span>
					<input ref="input" {...this.props} />
					<a onClick={this.clearHandler} href="#" className="clearInput"></a>
				</span>
			);
		}
	});
});