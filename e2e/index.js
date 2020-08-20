'use strict'

const path = require('path')
const execa = require('execa')
const test = require('ava')

const rootCommand = path.join(process.cwd(), 'bin/docsify')

test('shows up help message without any args', async t => {
  const {stderr} = await execa(rootCommand, {reject: false})
  t.snapshot(stderr)
})

const matchSnapshot = async (t, arg) => {
  const {stdout} = await execa(rootCommand, [arg])
  t.snapshot(stdout)
}

test('shows help with -h flag', matchSnapshot, '-h')
test('shows help with --help flag', matchSnapshot, '--help')
test('shows version information with -v flag', matchSnapshot, '-v')
test('shows version information with --version flag', matchSnapshot, '--version')

test('rejects promise due to error on passing in an unknown command', async t => {
  const {stderr} = await execa(rootCommand, ['junkcmd'], {reject: false})
  t.snapshot(stderr)
})

test('init the docs directory', async t => {
  // If you get `./test_docs already exists.`, delete the test_docs directory manually.
  const {stdout} = await execa(rootCommand, ['init', './test_docs'], {reject: false, timeout: 3000})
  t.snapshot(stdout)
})

test('init the docs directory twice', async t => {
  const {stdout} = await execa(rootCommand, ['init', './'], {reject: false, input: 'n'})
  t.snapshot(stdout)
})
