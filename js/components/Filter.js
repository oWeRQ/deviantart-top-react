define(['jquery', 'react'], function($, React){
	return React.createClass({
		handleSubmit: function(e){
			e.preventDefault();
			
			this.submit();
		},

		submit: function(){
			this.props.pages.setProps({
				url: rootUrl + '?ajax=1&' + $(this.getDOMNode()).serialize()
			});
		},

		render: function(){
			return (
				<form onSubmit={this.handleSubmit} className="b-form b-form_filter">
					<div className="row">
						<input type="text" name="title" placeholder="Search" /><a href="#" className="clearInput"></a>
					</div>

					<div className="b-form-legend m-open">Collections</div>
					<div className="b-form-fieldset">
						<div className="checkboxes">
							<div className="controls">
								<a href="#" className="checkAll">Check All</a>
								| <a href="#" className="uncheckAll">Uncheck All</a>
							</div>
							{this.props.galleries.map(function(gallery, i){
								return (
									<div key={gallery.title}>
										<input className="exclude" type="checkbox" name="exclude[]" value={gallery.title} />
										<label>
											<input type="checkbox" name="galleries[]" value={gallery.title} defaultChecked={gallery.title === 'Abstract'} />
											{gallery.title}
											<small>({gallery.approx_total})</small>&nbsp;
										</label>
									</div>
								);
							}.bind(this))}
						</div>
						<div className="row">
							<label><input type="radio" name="condition" value="or" defaultChecked /> OR</label>
							<label><input type="radio" name="condition" value="and" /> AND</label>
							<label><input type="radio" name="condition" value="only" /> ONLY</label>
						</div>
					</div>

					<div className="b-form-legend m-open">Limits</div>
					<div className="b-form-fieldset">
						<div className="row b-inline">
							<label>Favorites:</label>
							<input type="text" name="minFavs" defaultValue="1" />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Max Favs:</label>
							<input type="text" name="maxFavs" defaultValue="0" />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Deviations:</label>
							<input type="text" name="minDevia" defaultValue="0" />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Images:</label>
							<input type="text" name="imagesLimit" defaultValue="20" />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Top:</label>
							<input type="text" name="topLimit" defaultValue="10" />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Page:</label>
							<input type="text" name="page" defaultValue="1" />
							<a href="#" className="clearInput"></a>
						</div>
					</div>

					<div className="b-form-legend m-open">Sort</div>
					<div className="b-form-fieldset">
						<div className="row b-inline">
							<label>By:</label>
							<select name="sort">
								<option value="score">Score</option>
								<option value="wilson_score">Wilson Score</option>
								<option value="percent">Percent</option>
								<option value="deviations">Total</option>
								<option value="favourites">Favourites</option>
								<option value="random">Random</option>
							</select>
						</div>
						<div className="row b-inline">
							<label>Total:</label>
							<select name="sortTotal">
								<option value="deviations">Deviations</option>
								<option value="favourites">Favourites</option>
							</select>
						</div>
						<div className="row b-inline">
							<label>Dir:</label>
							<select name="sortDir">
								<option value="1">Desc</option>
								<option value="-1">Asc</option>
							</select>
						</div>
					</div>

					<div className="row actions">
						<input type="submit" value="Show" />
					</div>
				</form>
			);
		}
	});
});