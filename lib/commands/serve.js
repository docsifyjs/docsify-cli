'use strict'

const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const lrserver = require('livereload')
const opn = require('opn')
const chalk = require('chalk')
const util = require('../util/index')

var exists = util.exists
var resolve = util.resolve

module.exports = function (path, openInBrowser, port, livereloadPort, basePath) {
  path = resolve(path || '.')
  var indexFile = resolve(path, 'index.html')
  const subPath = normalizePath(basePath)

  if (!exists(indexFile)) {
    const msg = '\nNo docs found, please run ' + chalk.green('docsify init') + ' first.\n'
    console.log(msg)
    process.exit(0)
  }

  var server = connect()
  server.use(livereload({
    port: livereloadPort
  }))
  server.use(subPath, serveStatic(path))
  server.listen(port)
  lrserver.createServer({
    extraExts: ['md'],
    exclusions: ['node_modules/'],
    port: livereloadPort
  }).watch(path)

  const url = `http://localhost:${port}${subPath}`
  if (openInBrowser) {
    opn(url)
  }

  const msg = '\nServing ' + chalk.green(`${path}`) + ' now.\n' +
              'Listening at ' + chalk.green(url) + '\n'
  console.log(msg)
}

function normalizePath (basePath) {
  if (basePath === '.' || basePath === '') {
    return ''
  }

  return basePath[0] === '/' ? basePath : '/' + basePath
}
