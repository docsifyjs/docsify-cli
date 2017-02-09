var fs = require('fs')
var cp = require('cp-file').sync
var util = require('./util')

var exist = util.exist
var cwd = util.cwd
var pwd = util.pwd
var resolve = util.resolve
var green = util.green

var replace = function (file, tpl, replace) {
  fs.writeFileSync(file, fs.readFileSync(file).toString().replace(tpl, replace), 'utf-8')
}

var PKG = exist(cwd('package.json')) ? require(cwd('package.json')) : {}

exports.init = function (path, option) {
  path = path || '.'
  var msg = `\nCreate succeed! Please run\n
> ${green(`docsify serve ${path}`)}\n`

  path = cwd(path)
  var target = function (file) {
    return resolve(path, file)
  }
  var readme = exist(cwd('README.md')) || pwd('template/README.md')
  var main = pwd('template/index.html')

  if (option.local) {
    main = pwd('template/index.local.html')

    var vendor = exist(cwd('node_modules/docsify')) || pwd('../node_modules/docsify')

    cp(resolve(vendor, 'lib/docsify.min.js'), target('vendor/docsify.js'))
    cp(resolve(vendor, `lib/themes/${option.theme}.css`), target(`vendor/themes/${option.theme}.css`))
  }
  var filename = 'index.html'

  cp(readme, target('README.md'))
  cp(main, target(filename))
  cp(pwd('template/.nojekyll'), target('.nojekyll'))

  replace(target(filename), 'vue.css', `${option.theme}.css`)

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

exports.serve = require('./serve')
