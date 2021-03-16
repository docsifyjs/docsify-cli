const test = require('ava')
const fs = require('fs')
const path = require('path')
const {ENTER} = require('cli-prompts-test')

const {run, runPromptWithAnswers} = require('../helpers/test-utils.js')

const genPath = path.join(__dirname, 'init-cmd')
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

test('generates docs directory', t => {
  const {exitCode} = run(['init', 'docs'], {cwd: genPath})

  // Assert for exit code
  t.is(exitCode, 0)

  // Check for existence
  t.true(fs.existsSync(path.join(docsPath, 'README.md')))
  t.true(fs.existsSync(path.join(docsPath, 'index.html')))
})

test('force generates docs directory with --local flag', async t => {
  const {exitCode} = await runPromptWithAnswers(
    ['init', 'docs', '--local'],
    ['y', ENTER],
    genPath
  )
  t.is(exitCode, 0)
  t.true(fs.existsSync(path.join(docsPath, 'vendor')))
})
