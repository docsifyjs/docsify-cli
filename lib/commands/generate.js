'use strict'

const fs = require('fs')
const os = require('os')
const {cwd, exists} = require('../util')
const path = require('path')
const logger = require('../util/logger')
const ignoreFiles = ['_navbar', '_coverpage', '_sidebar']
const indent = '  '

// eslint-disable-next-line
module.exports = function (path = '', sidebar) {
  const cwdPath = cwd(path || '.')

  if (exists(cwdPath)) {
    if (sidebar) {
      const sidebarPath = cwdPath + '/' + sidebar || '_sidebar.md'

      if (!exists(sidebarPath)) {
        const lines = generateSidebar(cwdPath)
        writeSidebar(lines, sidebarPath)
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

function generateSidebar(cwdPath) {
  return generateSidebarOfDirectory(cwdPath, cwdPath, 0)
}

/**
 * @returns a list of string
 */
function generateSidebarOfDirectory(baseDirectory, currentDirectory, indentCount) {
  let lines = []
  // Current directory
  const contentOfCurrentDirectory = generateSidebarContentOfDirectory(currentDirectory, indentCount)
  console.log(contentOfCurrentDirectory)
  lines.push(contentOfCurrentDirectory)

  // Get all directories
  const subDirectories = listDirectory(currentDirectory)
  for (const subDirectory of subDirectories) {
    const subLines = generateSidebarOfDirectory(baseDirectory, subDirectory, indentCount + 1)
    for (const subLine of subLines) {
      lines.push(subLine)
    }
  }

  // Get all files under currentDirectory
  const mdFilePaths = listMdFilePaths(currentDirectory)
  for (const mdFilePath of mdFilePaths) {
    const mdFilePathLink = generateSidebarLinkOfFile(baseDirectory, mdFilePath, indentCount + 1)
    console.log(mdFilePathLink)
    lines.push(mdFilePathLink)
  }

  return lines
}

function listDirectory(directory) {
  return fs.readdirSync(directory)
    .map(relativePath => path.join(directory, relativePath))
    .filter(path => fs.statSync(path).isDirectory())
}

function listMdFilePaths(directory) {
  return fs.readdirSync(directory)
    .map(relativePath => path.join(directory, relativePath))
    .filter(pathname => !fs.statSync(pathname).isDirectory() && path.extname(pathname) === '.md')
    .filter(pathname => {
      for (const ignoreFile of ignoreFiles) {
        if (pathname.includes(ignoreFile)) {
          return false
        }
      }

      return true
    })
}

function generateSidebarContentOfDirectory(currentDirectory, indentCount) {
  const directoryName = path.basename(path.resolve(currentDirectory))
  return generateIndents(indentCount) + '- ' + directoryName
}

function generateSidebarLinkOfFile(baseDirectory, filePath, indentCount) {
  return generateIndents(indentCount) + '- ' + generateLinkOfFile(baseDirectory, filePath)
}

function generateIndents(indentCount) {
  return indent.repeat(indentCount)
}

function generateRelativePath(baseDirectory, fullPath) {
  return path.relative(baseDirectory, fullPath)
}

function generateLinkOfFile(baseDirectory, filePath) {
  const name = path.basename(filePath, '.md')
  const relativePath = generateRelativePath(baseDirectory, filePath)
  const relativePathNormalize = relativePath.split(path.sep).join('/')
  return ''.concat('[', name, ']', '(', relativePathNormalize, ')')
}

function writeSidebar(lines, sidebarPath) {
  const content = lines.join(os.EOL)
  fs.writeFileSync(sidebarPath, content, 'utf8')
}
