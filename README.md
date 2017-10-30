# express-react-server

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://choosealicense.com/licenses/mit/)
[![Node version](https://img.shields.io/badge/node-v8.4.0%2B-14ace8.svg)](https://nodejs.org/)

> Use react as a template for express **Support dynamic React** !!

## Installation

```shell
npm install --save express-react-server
```

## Basic templating usage

> Used for rendering static html

Structure:
```
My directory
|- server.js
`- views
   `- index.jsx
```

`server.js`:
```js
// Express
var express = require('express')
var app = express()

// Require express react server
var ers = require('express-react-server')
// Set the bundle dir
ers.set('bundleDir', './bundle')

// Define engine
app.engine('jsx', ers.createEngine())

// Define views
app.set('views', './views')
app.set('view engine', 'jsx')

app.get('/', function (req, res) {
  res.render('index', {title: 'Express-React-Server', name: 'John Doe'})
})

app.listen(8000, function () {
  console.log('Server listening on port 8000.')
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

Structure:
```
My directory
|- server.js
|- bundle
|  `- index.jsx
`- views
   `- index.jsx
```

`server.js`:
```js
// Same as the precendent but with
app.use('/bundle', ers.servBundle)
```

`views/index.jsx`:
```js
import React from 'react'

// Component
class CoolButton extends React.Component {
  componentWillMount () {
    this.setState({count: 0})
  }

  render () {
    const {count} = this.state

    return (
      <button type='button' onClick={() => this.setState({count: count + 1})}>
        Click HERE to increment: {count}
      </button>
    )
  }
}

// Export default for server first rendering
export default class extends React.Component {
  render () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet='utf-8' />
        </head>
        <body>
          <CoolButton />
          {/* Require the index bundle */}
          <script src='/bundle/index' />
        </body>
      </html>
    )
  }
}

// Export for the bundle
export { CoolButton }
```

`bundle/index.jsx`:
```js
import React from 'react'
import ReactDOM from 'react-dom'
import { CoolButton } from '../views/index.jsx'

// Use hydrate to initialize event, inputs ...
ReactDOM.hydrate(<CoolButton />, document.querySelector('body'))
```
