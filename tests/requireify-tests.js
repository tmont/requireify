var should = require('should'),
	requireify = require('../'),
	path = require('path'),
	browserify = require('browserify');

describe('requireify', function() {
	function getFile(name) {
		return path.join(__dirname, name);
	}

	function trimBuffer(buffer) {
		return buffer.toString().split('\n')[1];
	}

	it('should do nothing if no allowed types are present', function(done) {
		var b = browserify([ getFile('files/require-foo.js') ]);
		b.transform(requireify());

		b.bundle(function(err, buffer) {
			should.not.exist(err);
			trimBuffer(buffer).should.equal('foo');
			done();
		});
	});

	it('should exportify allowed type', function(done) {
		var b = browserify([ getFile('files/require-foo.js') ]);
		b.transform(requireify({ extensions: [ 'txt' ] }));

		b.bundle(function(err, buffer) {
			should.not.exist(err);
			trimBuffer(buffer).should.equal('module.exports = \'foo\';');
			done();
		});
	});

	it('should escape backslashes', function(done) {
		var b = browserify([ getFile('files/require-backslashes.js') ]);
		b.transform(requireify({ extensions: [ 'html' ] }));

		b.bundle(function(err, buffer) {
			should.not.exist(err);
			trimBuffer(buffer).should.equal('module.exports = \'\\\\n \\\\\\\\\';');
			done();
		});
	});

	it('should escape single quotes', function(done) {
		var b = browserify([ getFile('files/require-single-quotes.js') ]);
		b.transform(requireify({ extensions: [ 'txt' ] }));

		b.bundle(function(err, buffer) {
			should.not.exist(err);
			trimBuffer(buffer).should.equal('module.exports = \'jerry\\\'s jerry\\\'s\';');
			done();
		});
	});

	it('should replace newlines', function(done) {
		var b = browserify([ getFile('files/require-newlines.js') ]);
		b.transform(requireify({ extensions: [ 'txt' ] }));

		b.bundle(function(err, buffer) {
			should.not.exist(err);
			trimBuffer(buffer).should.equal('module.exports = \'foo\\nbar\\nbaz\\n\';');
			done();
		});
	});
});