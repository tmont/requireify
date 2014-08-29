var through = require('through'),
	path = require('path');

function str2js(str) {
	return 'module.exports = \'' + str
		.replace(/\\/g, '\\\\')
		.replace(/(\r\n|\r|\n)/g, '\\n')
		.replace(/'/g, '\\\'') +
		'\';';
}

function requireify(options) {
	options = options || {};
	options.allowed = (options.allowed || []).map(function(ext) {
		return ext.toLowerCase();
	});

	return function(file) {
		var ext = path.extname(file).substring(1);
		if (options.allowed.indexOf(ext) === -1) {
			return through();
		}

		var source = '';

		function write(buffer) {
			source += buffer;
		}

		function end() {
			var exportified = str2js(source);
			this.queue(exportified);
			this.queue(null);
		}

		return through(write, end);
	};
}

module.exports = requireify;