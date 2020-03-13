'use strict'

const path = require('path')
const execa = require('execa')
const test = require('ava')

let rootCommand = path.join(process.cwd(), 'bin/docsify')

test('shows up help message without any args', async t => {
  const {stderr} = await execa(rootCommand, {reject: false})
  t.snapshot(stderr)
})

const matchSnapshot = async (t, arg) => {
  let args = [arg]

  if ((typeof arg) === 'object') {
    args = [arg[0], ...arg.slice(1)]
  }

  const {stdout} = await execa(rootCommand, args)
  t.snapshot(stdout)
}

test('shows help with -h flag', matchSnapshot, '-h')
test('shows help with --help flag', matchSnapshot, '--help')
test('shows help with init --help flag', matchSnapshot, ['init', '--help'])
test('shows version information with -v flag', matchSnapshot, '-v')
test('shows version information with --version flag', matchSnapshot, '--version')

test('rejects promise due to error on passing in an unknown command', async t => {
  const {stderr} = await execa(rootCommand, ['junkcmd'], {reject: false})
  t.snapshot(stderr)
})
