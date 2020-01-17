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
      const server = connect()
      server.use(
        livereload({
          port: livereloadPort
        })
      )

      let indexFileFound = false
      let indexFile
      path.split(',').forEach(path => {
        path = resolve(path || ',')
        indexFile = resolve(path, indexName || 'index.html')
        if (exists(indexFile)) {
          indexFileFound = true
        }

        server.use(serveStatic(path, {index: indexName}))
      })

      if (!indexFileFound) {
        const msg =
          '\nNo docs found ' +
          indexFile +
          '\nPlease run ' +
          chalk.green('docsify init') +
          ' first.\n'
        console.log(msg)
        process.exit(0)
      }

      server.listen(port)
      lrserver
        .createServer({
          extraExts: ['md'],
          exclusions: ['node_modules/'],
          port: livereloadPort
        })
        .watch(path.split(','))

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
      console.error(err.message)
    })
}
