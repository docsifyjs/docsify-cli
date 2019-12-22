'use strict'

const fs = require('fs')

const resolve = (exports.resolve = require('path').resolve)

exports.cwd = function (path) {
  return resolve(process.cwd(), path || '.')
}

exports.pwd = function (path) {
  return resolve(require('path').dirname(__dirname), path)
}

exports.exists = function (path) {
  if (fs.existsSync(path)) {
    return path
  }

  return undefined
}

exports.pkg = function () {
  return exports.exists(exports.cwd('package.json')) ?
    require(exports.cwd('package.json')) :
    {}
}

exports.read = function (path) {
  return fs.readFileSync(path, 'utf-8').toString()
}
