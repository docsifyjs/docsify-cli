'use strict'

const fs = require('fs')
const os = require('os')
const {cwd, exists} = require('../util')
const path = require('path')
const logger = require('../util/logger')
const ignoreFiles = ['_navbar', '_coverpage', '_sidebar']

module.exports = function (path, sidebar, options) {
  const cwdPath = cwd(path || '.')

  if (exists(cwdPath)) {
    if (sidebar) {
      const sidebarPath = cwdPath + '/' + sidebar || '_sidebar.md'

      if (!exists(sidebarPath) || options.overwrite) {
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
  const sidebarContent = generateContent(cwdPath, cwdPath).join(os.EOL)
  fs.writeFileSync(sidebarPath, sidebarContent, 'utf8', err => {
    if (err) {
      logger.error(`Couldn't generate the sidebar file, error: ${err.message}`)
    }
  })
}

function generateContent(directory, rootPath) {
  const content = []
  fs.readdirSync(directory).forEach(file => {
    const cwdPath = path.join(directory, file)
    const relativePath = path.relative(rootPath, cwdPath)
    const filePath = relativePath.replace(/\s/g, '%20')
    const filename = modifyFileName(file)

    if (fs.statSync(cwdPath).isDirectory()) {
      const childContent = generateContent(cwdPath, rootPath) // Recursive call

      const isReadmePresent = fs.existsSync(path.join(cwdPath, 'README.md'))
      const hasChildContent = childContent.length > 0

      if (hasChildContent && isReadmePresent) {
        content.push(`- [${filename}](${filePath}/README.md)`, ...childContent.map(item => `  ${item}`))
      } else if (hasChildContent && !isReadmePresent) {
        content.push(`- ${filename}`, ...childContent.map(item => `  ${item}`))
      } else if (!hasChildContent && isReadmePresent) {
        content.push(`- [${filename}](${filePath}/README.md)`)
      } else {
        content.push(`- [${filename}](${filePath})`)
      }
    } else if (path.extname(file) === '.md' &&
          file.toLowerCase() !== 'readme.md' &&
          ignoreFiles.indexOf(filename) === -1) {
      content.push(`- [${filename}](${filePath})`)
    }
  })
  return content
}

function modifyFileName(file) {
  const filename = file.split('-')
  const fileWithExtension = filename.length > 1 ? filename[1] : filename[0]
  return path.basename(fileWithExtension, '.md')
}
