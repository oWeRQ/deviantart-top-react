define(function(require){
	var React = require('react');

	return React.createClass({
		displayName: 'Select',

		getInitialState: function(){
			return {
				opened: false
			};
		},

		buttonClickHandler: function(e){
			if (e.target !== e.currentTarget)
				return;
			
			this.setState({
				opened: !this.state.opened
			});
		},

		optionClickHandler: function(option, e){
			e.preventDefault();

			this.setState({
				opened: false
			});

			this.props.onChange(option);
		},

		render: function() {
			return (
				<span className="b-select">
					<span className="m-button m-down" onClick={this.buttonClickHandler}>
						{this.props.text}
					</span>
					<div className="b-dropmenu" style={{display: this.state.opened ? '' : 'none'}}>
						<ul>
							{this.props.options.map(function(option){
								return <li><a onClick={this.optionClickHandler.bind(this, option)}>{option.title}</a></li>;
							}, this)}
						</ul>
					</div>
				</span>
			);
		}
	});
});