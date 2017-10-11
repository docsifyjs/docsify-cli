'use strict'

const connect = require('connect')
const serveStatic = require('serve-static')
const Renderer = require('docsify-server-renderer')
const fs = require('fs')
const util = require('../util/index')
const chalk = require('chalk')

var defaultConfig = {
  template: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Doc</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <link rel="stylesheet" href="//unpkg.com/docsify/lib/themes/vue.css" title="vue">
</head>
<body>
  <!--inject-app-->
  <!--inject-config-->
<script src="//unpkg.com/docsify/lib/docsify.min.js"></script>
</body>
</html>`
}

function loadConfig (config) {
  try {
    return require(util.cwd(config))
  } catch (e) {
    console.log(chalk.red(`${e.message} in ${config}`))
    process.exit(1)
  }
}

module.exports = function (path, configFile, port) {
  let config = defaultConfig
  const pkg = util.pkg()
  let ctx = util.cwd('.')

  path = path || './'

  if (configFile) {
    config = loadConfig(configFile)
    config.template = /\.html$/.test(config.template)
      ? util.read(util.resolve(ctx, config.template))
      : defaultConfig.template
  } else if (pkg.docsify) {
    const tpl = pkg.docsify.template

    config = pkg.docsify
    config.template = (tpl && util.exists(util.resolve(ctx, tpl)))
      ? util.read(tpl)
      : defaultConfig.template
  }

  var renderer = new Renderer(Object.assign(defaultConfig, config))
  var server = connect()

  server.use(serveStatic(path))
  server.use(function(req, res) {
    serveStatic(path)(req, res, function () {
      if (/\.(jpg|jpeg|gif|png|svg|ico|mp4|webm|ogg|ogv|js|css|md)(?:\?v=[0-9.]+)?$/.test(req.url)) {
        res.writeHead(404)
        res.end()
      }
      renderer.renderToString(req.url)
        .then(function (html) {
          res.end(html)
        })
        .catch(function (err) {
          res.writeHead(404)
          res.end()
        })
    })
  })
  server.listen(port || 4000)

  const msg = '\n'
    + chalk.blue('[SSR]')
    + ' Serving ' + chalk.green(`${path}`) + ' now.\n'
    + 'Listening at ' + chalk.green(`http://localhost:${port}`) + '\n'

  console.log(msg)
}
