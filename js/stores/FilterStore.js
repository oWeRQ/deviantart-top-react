define(function(require){
	var Actions = require('Actions');
	var Reflux = require('reflux');
	var GalleriesStore = require('stores/GalleriesStore');

	return Reflux.createStore({
		listenables: [Actions],

		getInitialState: function () {
			this.state = {
				title: '',
				galleries: ['Abstract'],
				exclude: [],
				condition: 'or',
				minFavs: '1',
				maxFavs: '0',
				minDevia: '0',
				imagesLimit: '20',
				topLimit: '10',
				page: '1',
				sort: 'score',
				sortTotal: 'deviations',
				sortDir: '1'
			};
			return this.state;
		},

		onFilterValue: function(name, value, checked){
			if (name.substr(-2) === '[]') {
				name = name.substr(0, name.length - 2);

				var idx = this.state[name].indexOf(value);

				if (idx === -1 && checked === true)
					this.state[name].push(value);
				else if (idx !== -1 && checked === false)
					this.state[name].splice(idx, 1);
			} else {
				this.state[name] = value;
			}

			this.trigger(this.state);
		},

		onFilterCheckAll: function(){
			this.state.galleries = GalleriesStore.list.map(function(gallery){
				return gallery.title;
			});
			this.trigger(this.state);
		},

		onFilterUncheckAll: function(){
			this.state.galleries = [];
			this.trigger(this.state);
		},

		onFilterLoad: function(){
			Actions.load(this.state);
		}
	});
});