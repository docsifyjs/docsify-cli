var serveStatic = require('serve-static')
var connect = require('connect')
var livereload = require('connect-livereload')
var lrserver = require('livereload')
var util = require('./util')

var green = util.green
var exist = util.exist
var resolve = util.resolve

module.exports = function (path, option) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exist(indexFile)) {
    console.log(`\nplease run ${green('init')} before.\n`)
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
  console.log(`Serve ${green(`${path}`)}`)
  console.log(`Listening at ${green(`http://localhost:${option.port}`)}`)
  console.log('\n')
}
