define(function(require){
	var React = require('react');
	var Actions = require('Actions');

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
						className={'m-showInGallery' + (this.props.image.selected ? ' selected' : '') + (this.props.cursor ? ' m-cursor' : '')}
						href={rootUrl + 'images/original/' + this.props.image.filename}
						target="_blank"
						title={this.props.image.title}
						data-galleries={this.props.image.galleries.join(', ')}>
						<img src={rootUrl + 'images/mythumbs/' + this.props.image.filename} />
					</a>
				</li>
			);
		}
	});
});
