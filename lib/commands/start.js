'use strict'

const connect = require('connect')
const serveStatic = require('serve-static')
const Renderer = require('docsify-server-renderer')
const util = require('../util')
const chalk = require('chalk')
const logger = require('../util/logger')
const LRU = require('lru-cache')

const defaultConfig = {
  template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Doc</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/docsify/lib/themes/vue.css" title="vue">
</head>
<body>
  <!--inject-app-->
  <!--inject-config-->
<script src="//cdn.jsdelivr.net/npm/docsify/lib/docsify.min.js"></script>
</body>
</html>`
}

function loadConfig(config) {
  try {
    return require(util.cwd(config))
  } catch (e) {
    logger.error(`${e.message} in ${config}`)
    process.exit(1)
  }
}

module.exports = function (path, configFile, port) {
  let config = defaultConfig
  const pkg = util.pkg()
  const ctx = util.cwd('.')

  path = path || './'

  if (configFile) {
    config = loadConfig(configFile)
    config.template = /\.html$/.test(config.template) ?
      util.read(util.resolve(ctx, config.template)) :
      defaultConfig.template
  } else if (pkg.docsify) {
    const tpl = pkg.docsify.template

    config = pkg.docsify
    config.template =
      tpl && util.exists(util.resolve(ctx, tpl)) ?
        util.read(tpl) :
        defaultConfig.template
  }

  const renderer = new Renderer(Object.assign(defaultConfig, config))
  const server = connect()
  const cached = new LRU(config.maxAge || 0)

  server.use(serveStatic(path))
  server.use(function (req, res) {
    serveStatic(path)(req, res, function () {
      if (
        /\.(jpg|jpeg|gif|png|svg|ico|mp4|webm|ogg|ogv|js|css|md)(?:\?v=[0-9.]+)?$/.test(
          req.url
        )
      ) {
        res.writeHead(404)
        res.end()
      }

      Promise.resolve(cached.get(req.url) || renderer.renderToString(req.url))
        .then(function (html) {
          cached.set(req.url)
          res.end(html)
        })
        .catch(function (err) {
          logger.error(err)
          res.writeHead(404)
          res.end()
        })
    })
  })
  server.listen(port || 4000)

  const msg =
    '\n' +
    chalk.blue('[SSR]') +
    ' Serving ' +
    chalk.green(`${path}`) +
    ' now.\n' +
    'Listening at ' +
    chalk.green(`http://localhost:${port}`) +
    '\n'

  console.log(msg)
}
