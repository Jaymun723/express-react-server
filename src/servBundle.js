var express = require('express')
var browserify = require('browserify')
var path = require('path')

var router = express.Router()

router.all('/:name', function (req, res) {
  browserify()
    .add(path.join(`${bundleDir}`, `${req.params.name}.jsx`))
    .transform('babelify', {presets: ['env', 'react']})
    .bundle()
    .pipe(res)
})

module.exports = router
