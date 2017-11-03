// Require path
const path = require('path')

// Init Express
const express = require('express')
const app = express()

// Require express react server
const reactServer = require('../index.js')
// Set the bundle dir
reactServer.set('bundleDir', path.join(__dirname, 'bundle'))

// Define engine
app.engine('jsx', reactServer.createEngine())

// Define views
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jsx')

// Basic route
app.get('/', function (req, res) {
  res.render('index', {title: 'Express-React-Server', name: 'John Doe'})
})

// Serve the bundle
app.use('/bundle', reactServer.servBundle)

// Listening on port
var port = 8000
app.listen(port, function (err) {
  if (err) {
    throw err
  } else {
    process.exit(0)
  }
})
