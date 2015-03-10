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

	exports.crc16 = function(str){
		var crc = 0xFFFF;
		for (var c = 0; c < str.length; c++) {
			crc ^= str.charCodeAt(c) << 8;
			for (var i = 0; i < 8; i++) {
				if (crc & 0x8000)
					crc = (crc << 1) ^ 0x1021;
				else
					crc = crc << 1;
			}
		}
		return crc & 0xFFFF;
	};

	exports.str2color = function(str, saturation, lightness, colors){
		saturation = saturation || 50;
		lightness = lightness || 50;
		colors = colors || 18;

		var hue = Math.floor(exports.crc16(str) / 0xFFFF * colors) * 360 / colors;

		return 'hsl(' + hue + ',' + saturation + '%,' + lightness + '%)';
	};
});