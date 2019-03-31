"use strict";

const fs = require("fs");
const SSR_DEFAULT = require("../config").SSR_DEFAULT;
const chalk = require("chalk");

const resolve = (exports.resolve = require("path").resolve);

exports.cwd = function(path) {
  return resolve(process.cwd(), path || ".");
};

exports.pwd = function(path) {
  return resolve(require("path").dirname(__dirname), path);
};

exports.exists = function(path) {
  if (fs.existsSync(path)) {
    return path;
  }
  return undefined;
};

exports.pkg = function() {
  return exports.exists(exports.cwd("package.json"))
    ? require(exports.cwd("package.json"))
    : {};
};

exports.read = function(path) {
  return fs.readFileSync(path, "utf-8").toString();
};

function loadConfig(config) {
  try {
    return require(exports.cwd(config));
  } catch (e) {
    console.log(chalk.red(`${e.message} in ${config}`));
    process.exit(1);
  }
}

exports.getConfig = function(configFile) {
  const pkg = exports.pkg();
  const ctx = exports.cwd(".");
  let config = SSR_DEFAULT;

  if (configFile) {
    config = loadConfig(configFile);
    config.template = /\.html$/.test(config.template)
      ? read(resolve(ctx, config.template))
      : SSR_DEFAULT.template;
  } else if (pkg.docsify) {
    const tpl = pkg.docsify.template;

    config = pkg.docsify;
    config.template =
      tpl && exports.exists(resolve(ctx, tpl))
        ? exports.read(tpl)
        : SSR_DEFAULT.template;
  }

  return Object.assign(SSR_DEFAULT, config);
};
