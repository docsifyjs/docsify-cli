'use strict'

const serveStatic = require('serve-static')
const connect = require('connect')
const livereload = require('connect-livereload')
const history = require('connect-history-api-fallback')
const lrserver = require('livereload')
const open = require('open')
const chalk = require('chalk')
const logger = require('../util/logger')
const {exists, resolve} = require('../util')
const getPort = require('get-port')

module.exports = function (
  path,
  openInBrowser,
  port,
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
      const indexFileName = indexName || 'index.html'
      const indexFile = resolve(path, indexFileName)

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
      server.use(history({index: '/' + indexFileName}))
      server.use(serveStatic(path, {index: indexName}))
      server.listen(port)
      lrserver
        .createServer({
          extraExts: ['md'],
          exclusions: ['node_modules/'],
          port: livereloadPort
        })
        .watch(path)

      if (openInBrowser) {
        open(`http://localhost:${port}`)
      }

      const msg =
        '\nServing ' +
        chalk.green(`${path}`) +
        ' now.\n' +
        'Listening at ' +
        chalk.green(`http://localhost:${port}`) +
        '\n'
      console.log(msg)
    })
    .catch(err => {
      logger.error(err.message)
    })
}
