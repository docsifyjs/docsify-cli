"use strict";

const connect = require("connect");
const serveStatic = require("serve-static");
const Renderer = require("docsify-server-renderer");
const util = require("../util/index");
const chalk = require("chalk");
const LRU = require("lru-cache");

module.exports = function(path, configFile, port) {
  const config = util.getConfig(configFile);

  path = path || ".";

  const renderer = new Renderer(config);
  const server = connect();
  const cached = new LRU(config.maxAge || 0);

  server.use(function(req, res) {
    serveStatic(path, { index: false })(req, res, function() {
      if (
        /\.(jpg|jpeg|gif|png|svg|ico|mp4|webm|ogg|ogv|js|css|md)(?:\?v=[0-9.]+)?$/.test(
          req.url
        )
      ) {
        res.writeHead(404);
        res.end();
      }

      Promise.resolve(cached.get(req.url) || renderer.renderToString(req.url))
        .then(function(html) {
          cached.set(req.url);
          res.end(html);
        })
        .catch(function(err) {
          console.error(err);
          res.writeHead(404);
          res.end();
        });
    });
  });
  server.listen(port || 4000);

  const msg =
    "\n" +
    chalk.blue("[SSR]") +
    " Serving " +
    chalk.green(`${path}`) +
    " now.\n" +
    "Listening at " +
    chalk.green(`http://localhost:${port}`) +
    "\n";

  console.log(msg);
};
