var jsdom = require("jsdom").jsdom,
	fs = require('fs'),
	path = require('path'),
	util = require('util'),
	BaseHtml = require('mocha').reporters.HTML,
	css = fs.readFileSync(path.join(path.dirname(require.resolve('mocha')), 'mocha.css'), 'utf8'),
	temp = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');

// a kack to prevent execption of using cavas
var removeCanvasSupport = function (doc) {
	var proto = Object.getPrototypeOf(doc);
	proto._elementBuilders['canvas'] = null;
	removeCanvasSupport = function () { };
};

function HTML(runner) {
	// override global window and document object
	var doc = jsdom(temp);
	window = doc.defaultView;
	document = doc;
	removeCanvasSupport(document);

	// add css style
	var style = document.createElement('style');
	style.innerHTML = css;
	document.head.appendChild(style);

	BaseHtml.call(this, runner);

	runner.on('suite end', function (suite) {
		if (suite.root) {
			console.log(document.documentElement.outerHTML);
			return;
		}
	});
}

util.inherits(HTML, BaseHtml);
exports = module.exports = HTML;