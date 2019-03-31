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
const fs = require("fs");
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
    cwd: path
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
        spinner.text = "Rendering " + file;
      }
      return queue;
    })
    .then(data => {
      // 保存文件
      return Promise.all(
        data.map(({ url, content, path }) => {
          const filePath = url
            .replace(/README\.md$/, "index.html")
            .replace(/\.md$/, ".html");
          spinner.text = `Rendering ${url}`;
          write(resolve(util.cwd(), dest, filePath), content);
          fs.copyFileSync(path, resolve(util.cwd(), dest, url));
        })
      );
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
