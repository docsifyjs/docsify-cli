const fs = require('fs')
const cp = require('cp-file').sync
const chalk = require('chalk')
const util = require('../util/index')

var exists = util.exists
var cwd = util.cwd
var pwd = util.pwd
var resolve = util.resolve

var replace = function (file, tpl, replace) {
  fs.writeFileSync(file, fs.readFileSync(file).toString().replace(tpl, replace), 'utf-8')
}

var PKG = exists(cwd('package.json')) ? require(cwd('package.json')) : {}

module.exports = function (path, local, theme) {
  path = path || '.'
  var msg = '\n' + chalk.green('Initialization succeeded!') + ' Please run ' +
            chalk.inverse(`docsify serve ${path}`) + '\n'

  path = cwd(path)
  var target = function (file) {
    return resolve(path, file)
  }
  var readme = exists(cwd('README.md')) || pwd('template/README.md')
  var main = pwd('template/index.html')

  if (local) {
    main = pwd('template/index.local.html')

    var vendor = exists(cwd('node_modules/docsify')) || pwd('../node_modules/docsify')

    cp(resolve(vendor, 'lib/docsify.min.js'), target('vendor/docsify.js'))
    cp(resolve(vendor, `lib/themes/${theme}.css`), target(`vendor/themes/${theme}.css`))
  }
  var filename = 'index.html'

  cp(readme, target('README.md'))
  cp(main, target(filename))
  cp(pwd('template/.nojekyll'), target('.nojekyll'))

  replace(target(filename), 'vue.css', `${theme}.css`)

  if (PKG.name) {
    replace(target(filename), 'Document', PKG.name + (PKG.description ? (' - ' + PKG.description) : ''))
    replace(target(filename), 'data-name=""', `data-name="${PKG.name}"`)
  }
  if (PKG.description) {
    replace(target(filename), 'Description', PKG.description)
  }
  if (PKG.repository) {
    const repo = (PKG.repository.url || PKG.repository).replace(/\.git$/g, '').replace(/^git\+/g, '')
    replace(target(filename), 'data-repo=""', `data-repo="${repo}"`)
  }
  console.log(msg)
}
