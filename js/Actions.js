define(function(require){
	var Reflux = require('reflux');

	return Reflux.createActions([
		'filterValue',
		'filterCheckAll',
		'filterUncheckAll',
		'filterLoad',
		'loadGalleries',
		'load',
		'loadPrev',
		'loadNext',
		'loadMore',
		'setGalleries',
		'galleryClose',
		'galleryShow',
		'galleryNext',
		'galleryPrev'
	]);
});