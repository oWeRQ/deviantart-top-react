define(['react'], function(React){
	return React.createClass({
		render: function(){
			return (
				<li>
					<a id={'image_' + this.props.id} className="m-showInGallery" href={'images/original/' + this.props.filename} data-big={this.props.page} target="_blank" title={this.props.title} data-galleries={this.props.galleries.join(', ')} data-id={this.props.id}>
						<img src={'images/mythumbs/' + this.props.filename} />
					</a>
					<a className="m-similar" href={'similar.php?id=' + this.props.id} target="_blank"></a>
					<a className="m-update" href="#"></a>
				</li>
			);
		}
	});
});