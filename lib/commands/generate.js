'use strict'

const fs = require('fs')
const os = require('os')
const {cwd, exists} = require('../util')
const path = require('path')
const logger = require('../util/logger')
const ignoreFiles = ['_navbar', '_coverpage', '_sidebar']

// eslint-disable-next-line
module.exports = function (path = '', sidebar) {
  const cwdPath = cwd(path || '.')

  if (exists(cwdPath)) {
    if (sidebar) {
      const sidebarPath = cwdPath + '/' + sidebar || '_sidebar.md'

      if (!exists(sidebarPath)) {
        genSidebar(cwdPath, sidebarPath)
        logger.success(`Successfully generated the sidebar file '${sidebar}'.`)
        return true
      }

      logger.error(`The sidebar file '${sidebar}' already exists.`)
      process.exitCode = 1
      return false
    }
  }

  logger.error(`${cwdPath} directory does not exist.`)
}

function genSidebar(cwdPath, sidebarPath) {
  let tree = ''
  let lastPath = ''
  let nodeName = ''
  getDirFiles(cwdPath, function (pathname) {
    path.relative(pathname, cwdPath)
    pathname = pathname.replace(cwdPath + '/', '')
    let filename = path.basename(pathname, '.md')
    let splitPath = pathname.split(path.sep)

    if (ignoreFiles.indexOf(filename) !== -1) {
      return true
    }

    nodeName = '- [' + toCamelCase(filename) + '](' + pathname + ')' + os.EOL

    if (splitPath.length > 1) {
      if (splitPath[0] !== lastPath) {
        lastPath = splitPath[0]
        tree += os.EOL + '- ' + toCamelCase(splitPath[0]) + os.EOL
      }

      tree += '  ' + nodeName
    } else {
      if (lastPath !== '') {
        lastPath = ''
        tree += os.EOL
      }

      tree += nodeName
    }
  })
  fs.writeFile(sidebarPath, tree, 'utf8', err => {
    if (err) {
      logger.error(`Couldn't generate the sidebar file, error: ${err.message}`)
    }
  })
}

function getDirFiles(dir, callback) {
  fs.readdirSync(dir).forEach(function (file) {
    let pathname = path.join(dir, file)

    if (fs.statSync(pathname).isDirectory()) {
      getDirFiles(pathname, callback)
    } else if (path.extname(file) === '.md') {
      callback(pathname)
    }
  })
}

function toCamelCase(str) {
  return str.replace(/\b(\w)/g, function (match, capture) {
    return capture.toUpperCase()
  }).replace(/-|_/g, ' ')
}
