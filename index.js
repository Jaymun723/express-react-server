var React = require('react')
var ReactDOMServer = require('react-dom/server')
var _escaperegexp = require('lodash.escaperegexp')
var beautifyHTML = require('js-beautify').html
var express = require('express')
var browserify = require('browserify')
var path = require('path')
var router = express.Router()

module.exports = {
  set (arg, text) {
    if (arg === 'bundleDir') {
      router.all('/:name', function (req, res) {
        browserify()
          .add(path.join(`${text}`, `${req.params.name}.jsx`))
          .transform('babelify', {presets: ['env', 'react']})
          .bundle()
          .pipe(res)
      })
    }
  },

  createEngine (engineOptions = {}) {
    let registered = false
    let moduleDetectRegEx

    function renderFile (filename, options, callback) {
      if (!moduleDetectRegEx) {
        moduleDetectRegEx = new RegExp([].concat(options.settings.views).map(viewPath => '^' + _escaperegexp(viewPath)).join('|'))
      }

      if (!registered) {
        require('babel-register')({
          extensions: ['.jsx'],
          presets: ['react', 'env']
        })
        registered = true
      }

      try {
        let component = require(filename)
        component = component.default || component
        component = React.createElement(component, options)
        var result = '<!DOCTYPE html>' + ReactDOMServer.renderToString(component)
      } catch (error) {
        callback(error, null)
      } finally {
        if (options.settings.env === 'development') {
          Object.keys(require.cache).forEach(function (module) {
            if (moduleDetectRegEx.test(require.cache[module].filename)) {
              delete require.cache[module]
            }
          })
        }

        if (engineOptions.beautify) {
          result = beautifyHTML(result)
        }

        callback(null, result)
      }
    }
    return renderFile
  },

  servBundle: router

}
