define(function(require){
	var React = require('react');
	var Reflux = require('reflux');
	var Actions = require('Actions');
	var GalleriesStore = require('stores/GalleriesStore');
	var FilterStore = require('stores/FilterStore');

	return React.createClass({
		mixins: [
			Reflux.connect(GalleriesStore, 'galleriesList'),
			Reflux.connect(FilterStore)
		],

		inputHandler: function(e){
			Actions.filterValue(e.target.name, e.target.value, e.target.checked);
		},

		submitHandler: function(e){
			e.preventDefault();
			
			Actions.filterLoad();
		},

		checkAllHandler: function(e){
			e.preventDefault();

			Actions.filterCheckAll();
		},

		uncheckAllHandler: function(e){
			e.preventDefault();

			Actions.filterUncheckAll();
		},

		render: function(){
			return (
				<form onChange={this.inputHandler} onSubmit={this.submitHandler} className="b-form b-form_filter">
					<div className="row">
						<input type="text" name="title" value={this.state.title} placeholder="Search" /><a href="#" className="clearInput"></a>
					</div>

					<div className="b-form-legend m-open">Collections</div>
					<div className="b-form-fieldset">
						<div className="checkboxes">
							<div className="controls">
								<a href="#" className="checkAll" onClick={this.checkAllHandler}>Check All</a>
								| <a href="#" className="uncheckAll" onClick={this.uncheckAllHandler}>Uncheck All</a>
							</div>
							{this.state.galleriesList.map(function(gallery, i){
								return (
									<div key={gallery.title}>
										<input className="exclude" type="checkbox" name="exclude[]" value={gallery.title} checked={this.state.exclude.indexOf(gallery.title) !== -1} />
										<label>
											<input type="checkbox" name="galleries[]" value={gallery.title} checked={this.state.galleries.indexOf(gallery.title) !== -1} />
											{gallery.title}
											<small>({gallery.approx_total})</small>&nbsp;
										</label>
									</div>
								);
							}.bind(this))}
						</div>
						<div className="row">
							<label><input type="radio" name="condition" value="or" checked={this.state.condition === 'or'} /> OR</label>
							<label><input type="radio" name="condition" value="and" checked={this.state.condition === 'and'} /> AND</label>
							<label><input type="radio" name="condition" value="only" checked={this.state.condition === 'only'} /> ONLY</label>
						</div>
					</div>

					<div className="b-form-legend m-open">Limits</div>
					<div className="b-form-fieldset">
						<div className="row b-inline">
							<label>Favorites:</label>
							<input type="text" name="minFavs" value={this.state.minFavs} />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Max Favs:</label>
							<input type="text" name="maxFavs" value={this.state.maxFavs} />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Deviations:</label>
							<input type="text" name="minDevia" value={this.state.minDevia} />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Images:</label>
							<input type="text" name="imagesLimit" value={this.state.imagesLimit} />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Top:</label>
							<input type="text" name="topLimit" value={this.state.topLimit} />
							<a href="#" className="clearInput"></a>
						</div>
						<div className="row b-inline">
							<label>Page:</label>
							<input type="text" name="page" value={this.state.page} />
							<a href="#" className="clearInput"></a>
						</div>
					</div>

					<div className="b-form-legend m-open">Sort</div>
					<div className="b-form-fieldset">
						<div className="row b-inline">
							<label>By:</label>
							<select name="sort" value={this.state.sort}>
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
							<select name="sortTotal" value={this.state.sortTotal}>
								<option value="deviations">Deviations</option>
								<option value="favourites">Favourites</option>
							</select>
						</div>
						<div className="row b-inline">
							<label>Dir:</label>
							<select name="sortDir" value={this.state.sortDir}>
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