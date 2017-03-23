'use strict'

var fs = require('fs')

var resolve = exports.resolve = require('path').resolve

exports.cwd = function (path) {
  return resolve(process.cwd(), path)
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
