// Express
var express = require('express')
var app = express()

// Require express react server
var ers = require('../index.js')
// Set the bundle dir
ers.set('bundleDir', './bundle')

// Define engine
app.engine('jsx', ers.createEngine())

// Define views
app.set('views', './views')
app.set('view engine', 'jsx')

app.get('/', function (req, res) {
  res.render('index', {title: 'Express-Reac-Server', name: 'John Doe'})
})

app.use('/bundle', ers.servBundle)

app.listen(8000, function () {
  console.log('Server listening on port 8000.')
})
