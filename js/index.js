require.config({
	baseUrl: 'new/js/',
	paths: {
		text: '../bower_components/requirejs-text/text',
		jsx: '../bower_components/jsx-requirejs-plugin/js/jsx',
		JSXTransformer: '../bower_components/jsx-requirejs-plugin/js/JSXTransformer',
		react: '../bower_components/react/react-with-addons',
		jquery: '../bower_components/jquery/dist/jquery.min'
	}
});

require(['jquery', 'react', 'jsx!components/Filter', 'jsx!components/Pages'], function($, React, Filter, Pages){
	var pages = React.render(
		React.createFactory(Pages)(),
		document.querySelector('.l-content')
	);

	$.ajax({
		url: rootUrl + '?ajax=1&action=getFilter',
		dataType: 'json',
		success: function(result){
			result.pages = pages;
			var filter = React.render(
				React.createFactory(Filter)(result),
				document.querySelector('.l-sidebar')
			);
			filter.submit();
		}
	});
});
