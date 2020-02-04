'use strict'

const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const lrserver = require('livereload')
const open = require('open')
const chalk = require('chalk')
const {exists, resolve} = require('../util')
const getPort = require('get-port')

module.exports = function (
  path,
  openInBrowser,
  port,
  ip,
  livereloadPort,
  indexName
) {
  getPort({port})
    .then(p => {
      port = p
      return getPort({port: livereloadPort})
    })
    .then(p => {
      livereloadPort = p
    })
    .then(_ => {
      path = resolve(path || '.')
      const indexFile = resolve(path, indexName || 'index.html')

      if (!exists(indexFile)) {
        const msg =
          '\nNo docs found ' +
          indexFile +
          '\nPlease run ' +
          chalk.green('docsify init') +
          ' first.\n'
        console.log(msg)
        process.exit(0)
      }

      const server = connect()
      server.use(
        livereload({
          port: livereloadPort
        })
      )
      server.use(serveStatic(path, {index: indexName}))
      server.listen(port, ip)
      lrserver
        .createServer({
          extraExts: ['md'],
          exclusions: ['node_modules/'],
          port: livereloadPort
        })
        .watch(path)

      if (openInBrowser) {
        const host = ip === '0.0.0.0' ? 'localhost' : ip
        open(`http://${host}:${port}`)
      }

      const msg =
        '\nServing ' +
        chalk.green(`${path}`) +
        ' now.\n' +
        'Listening at ' +
        chalk.green(`http://${ip}:${port}`) +
        '\n'
      console.log(msg)
    })
    .catch(err => {
      console.error(err.message)
    })
}
