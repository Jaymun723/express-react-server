# express-react-server

[![Known Vulnerabilities](https://snyk.io/test/github/jaymun723/express-react-server/badge.svg)](https://snyk.io/test/github/jaymun723/express-react-server)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![Node version](https://img.shields.io/badge/node-v8.4.0%2B-14ace8.svg)](https://nodejs.org/)
[![Build Status](https://travis-ci.org/Jaymun723/express-react-server.svg?branch=master)](https://travis-ci.org/Jaymun723/express-react-server)
[![npm version](https://badge.fury.io/js/express-react-server.svg)](https://badge.fury.io/js/express-react-server)

> Use react as a template for express **Support dynamic React** !!

## Installation

```shell
npm install --save express-react-server
```

## Basic templating usage

> Used for rendering static html

Structure:

```dir
My directory
|- server.js
`- views
   `- index.jsx
```

`server.js`:

```js
// Require path
const path = require('path')

// Init Express
const express = require('express')
const app = express()

// Require express react server
const reactServer = require('express-react-server')

// Define engine
app.engine('jsx', reactServer.createEngine())

// Define views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')

// Basic route
app.get('/', function (req, res) {
  res.render('index', {title: 'Express-React-Server', name: 'John Doe'})
})

// Listening on port
var port = 8000
app.listen(port, function () {
  console.log('Server running on port: ' + port)
})

```

`views/index.jsx`:

```js
import React from 'react'

export default class extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
        </head>
        <body>
          <p>
            Hello, {this.props.name}!
          </p>
        </body>
      </html>
    )
  }
}
```

## Advanced templating Usage

> Used for rendering dynamic html

Check the in the [test directory](/test)

## Other stuff

Forked from [express-react-views](https://github.com/reactjs/express-react-views).
Code style [stabdard](https://standardjs.com/).

## License

See the [license file](/LICENSE)
