require.config({
	baseUrl: 'js/',
	paths: {
		text: '../bower_components/requirejs-text/text',
		jsx: '../bower_components/jsx-requirejs-plugin/js/jsx',
		JSXTransformer: '../bower_components/jsx-requirejs-plugin/js/JSXTransformer',
		react: '../bower_components/react/react-with-addons.min',
		reflux: '../bower_components/reflux/dist/reflux.min',
		jquery: '../bower_components/jquery/dist/jquery.min',
		Keypress: '../bower_components/Keypress/keypress-2.1.0.min',
	}
});

define(function(require){
	var React = require('react');
	var Actions = require('Actions');
	var App = require('jsx!components/App');

	React.render(
		App(),
		document.body,
		function(){
			Actions.loadGalleries();
			Actions.filterLoad();
		}
	);
});
