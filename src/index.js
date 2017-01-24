var fs = require('fs')
var http = require('http')
var resolve = require('path').resolve
var cp = require('cp-file').sync
var serveStatic = require('serve-static')

var cwd = function (path) {
  return resolve(process.cwd(), path)
}
var pwd = function (path) {
  return resolve(__dirname, path)
}
var exist = function (path) {
  if (fs.existsSync(path)) {
    return path
  }
  return undefined
}
var replace = function (file, tpl, replace) {
  fs.writeFileSync(file, fs.readFileSync(file).toString().replace(tpl, replace), 'utf-8')
}

var GREEN_OPEN = '\u001B[32m'
var GREEN_CLOSE = '\u001B[39m'
var PKG = exist(cwd('package.json')) ? require(cwd('package.json')) : {}

exports.init = function (path, option) {
  path = path || '.'
  var msg = `\nCreate succeed! Please run\n
> ${GREEN_OPEN}docsify serve ${path}${GREEN_CLOSE}\n`

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

exports.serve = function (path, option) {
  path = path || '.'
  var indexFile = resolve(path, 'index.html')

  if (!exist(indexFile)) {
    console.log(`\nplease run ${GREEN_OPEN}init${GREEN_CLOSE} before.\n`)
    process.exit(0)
  }

  http.createServer(function (req, res) {
    serveStatic(path)(req, res, function () {
      res.writeHead(404)
      res.end()
    })
  }).listen(option.port)

  console.log(`\nListening at ${GREEN_OPEN}http://localhost:${option.port}${GREEN_CLOSE}\n`)
}
