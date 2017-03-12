var chalk = require('chalk')
var serveStatic = require('serve-static')
var connect = require('connect')
var livereload = require('connect-livereload')
var lrserver = require('livereload')
var util = require('./util')

var exist = util.exist
var resolve = util.resolve

module.exports = function (path, option) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exist(indexFile)) {
    console.log('\nplease run ' + chalk.bgWhite('docsify ' + chalk.green.bold('init')) + ' before.\n')
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(option.port)
  lrserver.createServer({
    exts: ['md']
  }).watch(path)

  console.log('\n')
  console.log('Serving ' + chalk.inverse(`${path}`))
  console.log('Listening at ' + chalk.blue.underline('http://localhost:' + chalk.bgWhite(`${option.port}`)))
  console.log('\n')
}
