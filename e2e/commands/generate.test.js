const test = require('ava')
const fs = require('fs')
const path = require('path')

const {run} = require('../helpers/test-utils.js')

const genPath = path.join(__dirname, 'generate-cmd')
const docsPath = path.join(genPath, 'docs')

test.before('create temp directory', () => {
  // Cleanup if the directory already exists
  if (fs.existsSync(genPath)) {
    fs.rmdirSync(genPath, {recursive: true})
  }

  fs.mkdirSync(genPath)
})

test.after('cleanup', () => {
  fs.rmdirSync(genPath, {recursive: true})
})

test('generate _sidebar.md', t => {
  run(['init', 'docs'], {cwd: genPath})
  run(['generate', 'docs'], {cwd: genPath})
  // Check for existence
  t.true(fs.existsSync(path.join(docsPath, '_sidebar.md')))

  const {exitCode, stderr} = run(['generate', 'docs'], {
    cwd: genPath,
    reject: false
  })
  t.is(exitCode, 1)
  t.is(stderr, 'The sidebar file \'_sidebar.md\' already exists.')
})
