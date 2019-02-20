"use strict";

const fs = require("fs");
const cp = require("cp-file").sync;
const chalk = require("chalk");
const util = require("../util/index");

const exists = util.exists;
const cwd = util.cwd;
const pwd = util.pwd;
const resolve = util.resolve;
const read = util.read;

const replace = function(file, tpl, replace) {
  fs.writeFileSync(file, read(file).replace(tpl, replace), "utf-8");
};

const PKG = util.pkg();

module.exports = function(path = "", local, theme) {
  const msg =
    "\n" +
    chalk.green("Initialization succeeded!") +
    " Please run " +
    chalk.inverse(`docsify serve ${path}`) +
    "\n";

  path = cwd(path || ".");
  const target = file => resolve(path, file);
  const readme = exists(cwd("README.md")) || pwd("template/README.md");
  const main = pwd("template/index.html");

  if (local) {
    main = pwd("template/index.local.html");

    const vendor =
      exists(cwd("node_modules/docsify")) || pwd("../node_modules/docsify");

    cp(resolve(vendor, "lib/docsify.min.js"), target("vendor/docsify.js"));
    cp(
      resolve(vendor, `lib/themes/${theme}.css`),
      target(`vendor/themes/${theme}.css`)
    );
  }
  const filename = "index.html";

  cp(readme, target("README.md"));
  cp(main, target(filename));
  cp(pwd("template/.nojekyll"), target(".nojekyll"));

  replace(target(filename), "vue.css", `${theme}.css`);

  if (PKG.name) {
    replace(
      target(filename),
      "Document",
      PKG.name + (PKG.description ? " - " + PKG.description : "")
    );
    replace(target(filename), "name: '',", `name: '${PKG.name}',`);
  }
  if (PKG.description) {
    replace(target(filename), "Description", PKG.description);
  }
  if (PKG.repository) {
    const repo = (PKG.repository.url || PKG.repository)
      .replace(/\.git$/g, "")
      .replace(/^git\+/g, "");
    replace(target(filename), "repo: ''", `repo: '${repo}'`);
  }
  console.log(msg);
};
