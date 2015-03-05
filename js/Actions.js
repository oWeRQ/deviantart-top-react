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
		'loadMoreComplete',
		'setGalleries',
		'galleryClose',
		'galleryShow',
		'galleryNext',
		'galleryPrev',
		'authorSelect',
		'imagesSelect',
		'imagesSelectTo',
		'imagesSelectAll',
		'imagesCheck',
		'imagesAdd',
		'imagesRemove',
		'imagesDelete'
	]);
});