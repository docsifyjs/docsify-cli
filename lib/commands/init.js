'use strict'

const fs = require('fs')
const cp = require('cp-file').sync
const chalk = require('chalk')
const {prompt} = require('enquirer')
const {cwd, exists, pkg, pwd, read, resolve} = require('../util')

const replace = function (file, tpl, replace) {
  fs.writeFileSync(file, read(file).replace(tpl, replace), 'utf-8')
}

// eslint-disable-next-line
module.exports = function (path = '', local, theme) {
  const msg =
    '\n' +
    chalk.green('Initialization succeeded!') +
    ' Please run ' +
    chalk.inverse(`docsify serve ${path}`) +
    '\n'

  const cwdPath = cwd(path || '.')

  if (exists(cwdPath)) {
    console.log(chalk.red(`${path || '.'} already exists.`))

    prompt({
      type: 'confirm',
      name: 'rewrite',
      symbols: {
        separator: ''
      },
      message: 'Are you sure you want to rewrite it?'
    })
      .then(answers => {
        if (answers.rewrite === false) {
          return process.exit(0)
        }

        createFile(cwdPath, local, theme)
        console.log(msg)
      })
      .catch(console.error)

    return false
  }

  createFile(cwdPath, local, theme)
  console.log(msg)
}

function createFile(path, local, theme) {
  const target = file => resolve(path, file)
  const readme = exists(cwd('README.md')) || pwd('template/README.md')
  let main = pwd('template/index.html')

  if (local) {
    main = pwd('template/index.local.html')

    const vendor =
      exists(cwd('node_modules/docsify')) || pwd('../node_modules/docsify')

    cp(resolve(vendor, 'lib/docsify.min.js'), target('vendor/docsify.js'))
    cp(
      resolve(vendor, `lib/themes/${theme}.css`),
      target(`vendor/themes/${theme}.css`)
    )
  }

  const filename = 'index.html'

  cp(readme, target('README.md'))
  cp(main, target(filename))
  cp(pwd('template/.nojekyll'), target('.nojekyll'))

  replace(target(filename), 'vue.css', `${theme}.css`)

  if (pkg.name) {
    replace(
      target(filename),
      'Document',
      pkg.name + (pkg.description ? ' - ' + pkg.description : '')
    )
    replace(target(filename), 'name: \'\',', `name: '${pkg.name}',`)
  }

  if (pkg.description) {
    replace(target(filename), 'Description', pkg.description)
  }

  if (pkg.repository) {
    const repo = (pkg.repository.url || pkg.repository)
      .replace(/\.git$/g, '')
      .replace(/^git\+/g, '')
    replace(target(filename), 'repo: \'\'', `repo: '${repo}'`)
  }
}
