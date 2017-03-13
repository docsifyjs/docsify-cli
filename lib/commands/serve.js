var serveStatic = require('serve-static')
var connect = require('connect')
var livereload = require('connect-livereload')
var lrserver = require('livereload')
var chalk = require('chalk')
var util = require('../util/index')

var exists = util.exists
var resolve = util.resolve

module.exports = function (path, port) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exists(indexFile)) {
    console.log('\nNo docs found, please run ' + chalk.inverse('docsify init') + ' first.\n')
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(port)
  lrserver.createServer({
    exts: ['md']
  }).watch(path)

  console.log('\n')
  console.log('Serving ' + chalk.inverse(`${path}`) + ' now.')
  console.log('Listening at ' + chalk.inverse(`http://localhost:${port}`))
  console.log('\n')
}
