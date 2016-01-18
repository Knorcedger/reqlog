# reqlog [![Build Status](https://travis-ci.org/Knorcedger/reqlog.png?branch=master)](https://travis-ci.org/Knorcedger/reqlog)

A simple Node.js logger. Very closely attached to a request.

![]()

## Installation

Download node at [nodejs.org](http://nodejs.org) and install it, if you haven't already.

```sh
npm install reqlog --save
```

## Usage

```sh
var reqlog = require('reqlog');
reqlog.log('Endpoint', 'users/search');
reqlog.warn('UserSearch', 'NOT_FOUND');
reqlog.error('Internal Server Error', errorData);
reqlog.info('Success');
```

## API

### log/warn/error/info (label, [data])

#### label

Type: `string`

A log label

#### data

Type: `any`  
Default: `false`

Any data that you want to log alongside your label.  
It can be of any type, and it's optional.

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
