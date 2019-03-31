"use strict";

const serveStatic = require("serve-static");
const connect = require("connect");
const getPort = require("get-port");
const Renderer = require("docsify-server-renderer");
const util = require("../util/index");
const fg = require("fast-glob");
const write = require("write");
const ora = require("ora");
const chalk = require("chalk");
const fse = require("fs-extra");

const resolve = util.resolve;

module.exports = function(
  path = "",
  configFile,
  indexName,
  dest = "docs-static"
) {
  path = resolve(path || ".");
  const config = util.getConfig(configFile);
  // docs absolute path
  config.path = path;

  const server = connect();
  const indexFile = resolve(path, indexName || "index.html");
  const render = new Renderer(config);
  const files = fg.sync("**/*.md", {
    cwd: path,
    ignore: ["_*"]
  });
  let app;
  const spinner = ora();

  spinner.start("Rendering");

  getPort()
    .then(async port => {
      server.use(serveStatic(path, { index: indexFile }));
      app = server.listen(port);

      const queue = [];
      for (const file of files) {
        const res = await render.render(file);
        queue.push(res);
        console.log("Rendering " + file);
      }
      return queue;
    })
    .then(data => {
      // save file
      return Promise.all(
        data.map(({ url, content, path }) => {
          const filePath = url
            .replace(/README\.md$/, "index.html")
            .replace(/\.md$/, ".html");
          write(resolve(util.cwd(), dest, filePath), content);
        })
      );
    })
    .then(() => {
      return fse.copy(path, dest);
    })
    .then(() => {
      spinner.succeed(`Success! Generate static files at ${chalk.green(dest)}`);
      app && app.close();
    })
    .catch(e => {
      spinner.fail(e.message);
      app && app.close();
    });
};
