var fs = require('fs')

var resolve = exports.resolve = require('path').resolve

exports.cwd = function (path) {
  return resolve(process.cwd(), path)
}

exports.pwd = function (path) {
  return resolve(__dirname, path)
}

exports.exist = function (path) {
  if (fs.existsSync(path)) {
    return path
  }
  return undefined
}

exports.green = function (str) {
  return '\u001B[32m' + str + '\u001B[39m'
}
