'use strict';

const chalk = require('chalk');

/**
 * Beutifies the log data and logs!
 * @method log
 * @param  {string} type  The log type
 * @param  {string} label The log label
 * @param  {any} data  The data to display next to the label (optional)
 */
function log(type, label, data) {
	var typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

	if (typeLabel === 'Error') {
		typeLabel = chalk.red(typeLabel);
	} else if (typeLabel === 'Warn') {
		typeLabel = chalk.yellow(typeLabel);
	} else if (typeLabel === 'Info') {
		typeLabel = chalk.green(typeLabel);
	} else if (typeLabel === 'Log') {
		typeLabel = chalk.gray(typeLabel);
	}

	// used to avoid logging "undefined" in the console
	if (data) {
		console[type](typeLabel + ':', chalk.cyan(label), data);
	} else {
		console[type](typeLabel + ':', chalk.cyan(label));
	}
}

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
exports.start = function(req, res, next) {
	req.reqlog = {
		profiling: {
			start: (new Date()).getTime()
		}
	};
	GLOBAL.log('');
	GLOBAL.log(req.method, req.originalUrl);
	res.on('finish', function() {
		req.reqlog.profiling.end = (new Date()).getTime();
		req.reqlog.profiling.time = req.reqlog.profiling.end -
			req.reqlog.profiling.start;
		GLOBAL.log('END', req.reqlog.profiling.time);
	});

	next();
};
