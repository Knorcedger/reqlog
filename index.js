'use strict';

const chalk = require('chalk');

var useTypeLabels = false;

/**
 * Beutifies the log data and logs!
 * @method log
 * @param  {string} type  The log type
 * @param  {string} label The log label
 * @param  {any} data  The data to display next to the label (optional)
 */
function log(type, label, data) {
	var typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
	var color;

	if (typeLabel === 'Error') {
		typeLabel = chalk.red(typeLabel);
		color = 'red';
	} else if (typeLabel === 'Warn') {
		typeLabel = chalk.yellow(typeLabel);
		color = 'yellow';
	} else if (typeLabel === 'Info') {
		typeLabel = chalk.green(typeLabel);
		color = 'green';
	} else if (typeLabel === 'Log') {
		typeLabel = chalk.gray(typeLabel);
		color = 'gray';
	}

	// used to avoid logging "undefined" in the console
	if (useTypeLabels) {
		label = typeLabel + ': ' + chalk.cyan(label);
	} else {
		label = chalk[color](label);
	}
	if (data) {
		console[type](label, data);
	} else {
		console[type](label);
	}
}

/**
 * Initialize the reqlog module
 * @method function
 * @param  {bollean} typeLabels Enable or disable typeLabels
 */
exports.init = function(typeLabels) {
	useTypeLabels = Boolean(typeLabels);
};

exports.log = function(label, data) {
	log('log', label, data);
};

exports.error = function(label, data) {
	log('error', label, data);
};

exports.info = function(label, data) {
	log('info', label, data);
};

exports.warn = function(label, data) {
	log('warn', label, data);
};

// on each request start, we create the reqlog attribute on req
// and start the profiling
exports.start = function(req, res) {
	req.reqlog = {
		profiling: {
			start: (new Date()).getTime()
		}
	};

	this.info('Request ' + req.method, req.url);

	var self = this;
	res.on('finish', function() {
		req.reqlog.profiling.end = (new Date()).getTime();
		req.reqlog.profiling.time = req.reqlog.profiling.end -
			req.reqlog.profiling.start;
		self.log('END', req.reqlog.profiling.time);
	});
};
