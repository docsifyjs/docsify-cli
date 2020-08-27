const execa = require('execa')
const path = require('path')
const runTest = require('cli-prompts-test')

const CLI_PATH = path.join(__dirname, '..', '..', 'bin', 'docsify')

const run = (args, options = {}) => execa.sync(CLI_PATH, args, options)

const runPromptWithAnswers = (args, answers, testPath) => {
  return runTest([CLI_PATH].concat(args), answers, {
    testPath
  })
}

module.exports = {
  run,
  runPromptWithAnswers
}
