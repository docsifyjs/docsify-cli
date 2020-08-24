const test = require('ava')
const fs = require('fs')

const {run, runPromptWithAnswers, ENTER} = require('../helpers/test-utils.js')

const genPath = `${__dirname}/init-cmd`
const docsPath = `${__dirname}/init-cmd/docs`

test.before('create temp directory', () => {
  fs.mkdirSync(genPath)
})

test.after('cleanup', () => {
  fs.rmdirSync(genPath, {recursive: true})
})

test('generates docs directory', t => {
  run(['init', 'docs'], {cwd: genPath})
  // Check for existence
  t.true(fs.existsSync(`${docsPath}/README.md`))
  t.true(fs.existsSync(`${docsPath}/index.html`))
})

test('force generates docs directory with --local flag', async t => {
  await runPromptWithAnswers(['init', 'docs', '--local'], ['y', ENTER], genPath)
  t.true(fs.existsSync(`${docsPath}/vendor`))
})
