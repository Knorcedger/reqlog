# reqlog [![Build Status](https://travis-ci.org/Knorcedger/reqlog.png?branch=master)](https://travis-ci.org/Knorcedger/reqlog)

A simple Node.js logger. Very closely attached to a request.

![](https://raw.githubusercontent.com/Knorcedger/reqlog/master/Screenshot.png)
> With Type Labels

![](https://raw.githubusercontent.com/Knorcedger/reqlog/master/Screenshot-without-typelabels.png)
> Without Type Labels

It also supports a minimal profiling functionality to
calculate the time from request start to end.

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install reqlog --save
```

## Usage

```javascript
var reqlog = require('reqlog');
reqlog.log('Endpoint', 'users/search');
reqlog.warn('UserSearch', 'NOT_FOUND');
reqlog.error('Internal Server Error', errorData);
reqlog.info('Success');
```

### Complete example

```javascript
var http = require('http');
var reqlog = require('reqlog');

reqlog.init(false);

var errorData = {
	database: {
		status: 'crashed'
	}
};

var reqlog = require('reqlog');
reqlog.log('Endpoint', 'users/search');
reqlog.warn('UserSearch', 'NOT_FOUND');
reqlog.error('Internal Server Error', errorData);
reqlog.info('Success');

var server = http.createServer(function(request, response) {
});
server.on('request', function(req, res) {
	reqlog.start(req, res);
	res.write('<html><body>Hello!</body></html>');
	res.end();
});
server.listen(3000, 'localhost');
```

## API

### init(typeLabels)

Type: `boolean`

Init method should be used on server start, to configure
whether the logs should use typeLabels or not
(check screenshots above)

### log/warn/error/info (label, [data])

#### label

Type: `string`

A log label

#### data

Type: `any`  
Default: `false`

Any data that you want to log alongside your label.  
It can be of any type, and it's optional.

### start(req, res)

#### req

Type: `Object` The request object

#### res

Type: `Object` The response object

It logs the request start, end and the time passed.

## Tests

```sh
npm install
npm test
```

## Dependencies

- [chalk](https://github.com/chalk/chalk): Terminal string styling done right. Much color.

## Dev Dependencies

- [eslint](https://github.com/eslint/eslint): An AST-based pattern checker for JavaScript.
- [eslint-config-google](https://github.com/google/eslint-config-google): ESLint shareable config for the Google style


## License

MIT
