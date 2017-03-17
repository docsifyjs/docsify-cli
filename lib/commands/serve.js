const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const lrserver = require('livereload')
const open = require('open')
const chalk = require('chalk')
const util = require('../util/index')

var exists = util.exists
var resolve = util.resolve

module.exports = function (argv) {
  path = resolve(argv.path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exists(indexFile)) {
    const msg = '\nNo docs found, please run ' + chalk.green('docsify init') + ' first.\n'
    console.log(msg)
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(argv.port)
  lrserver.createServer({
    exts: ['md']
  }).watch(path)

  if (argv.open) {
    open(`http://localhost:${argv.port}`)
  }

  const msg = '\nServing ' + chalk.green(`${path}`) + ' now.\n' +
              'Listening at ' + chalk.green(`http://localhost:${argv.port}`) + '\n'
  console.log(msg)
}
