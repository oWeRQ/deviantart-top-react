define(function(require){
	var React = require('react');
	var Actions = require('Actions');
	var cx = React.addons.classSet;

	return React.createClass({
		displayName: 'Image',

		clickHandler: function(e){
			e.preventDefault();

			if (e.ctrlKey) {
				Actions.imagesSelect(this.props.image);
			} else if (e.shiftKey) {
				Actions.imagesSelectTo(this.props.image);
			} else {
				this.props.onClick.call(this, e);
			}
		},

		render: function(){
			return (
				<li>
					<a onClick={this.clickHandler}
						className={cx({
							'm-cursor': this.props.cursor,
							'm-selected': this.props.image.selected,
						})}
						title={this.props.image.title}
						data-galleries={this.props.image.galleries.join(', ')}
						target="_blank"
						href={rootUrl + 'images/original/' + this.props.image.filename}>
						<img src={rootUrl + 'images/mythumbs/' + this.props.image.filename} />
					</a>
				</li>
			);
		}
	});
});
