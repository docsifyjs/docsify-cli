const serveStatic = require('serve-static'),
  connect = require('connect'),
  livereload = require('connect-livereload'),
  lrserver = require('livereload'),
  open = require('open'),
  chalk = require('chalk'),
  util = require('../util/index')

var exists = util.exists,
  resolve = util.resolve

module.exports = function (path, port, disable-auto-open) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')

  if (!exists(indexFile)) {
    const msg = '\nNo docs found, please run ' + chalk.green('docsify init') + ' first.\n'
    console.log(msg)
    process.exit(0)
  }

  var server = connect()

  server.use(livereload())
  server.use(serveStatic(path))
  server.listen(port)
  lrserver.createServer({
    exts: ['md']
  }).watch(path)

  if (!disable-auto-open) {
    open(`http://localhost:${port}`)
  }

  const msg = '\nServing ' + chalk.green(`${path}`) + ' now.\n' +
              'Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'
  console.log(msg)
}
