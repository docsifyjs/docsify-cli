'use strict'

const fs = require('fs')
const cp = require('cp-file').sync
const chalk = require('chalk')
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

  path = cwd(path || '.')
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

  console.log(msg)
}
