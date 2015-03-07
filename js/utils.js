define(function(require, exports, module){
	exports.parseQuery = function(string){
		var data = {};
		var splits = string.split('&');

		for (var i = 0; i < splits.length; i++) {
			var parts = splits[i].split('=');
			var name = decodeURIComponent(parts.shift());
			var value = decodeURIComponent(parts.join('='));

			if (name.substr(-2) === '[]') {
				name = name.substr(0, name.length - 2);
				data[name] = data[name] || [];
				data[name].push(value);
			} else {
				data[name] = value;
			}
		}

		return data;
	};
});