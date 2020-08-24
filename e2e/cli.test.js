'use strict'

const test = require('ava')

const {run} = require('./helpers/test-utils.js')

test('shows up help message without any args', t => {
  const {stderr} = run([], {reject: false})
  t.snapshot(stderr)
})

const matchSnapshot = (t, arg) => {
  const {stdout} = run([arg])
  t.snapshot(stdout)
}

test('shows help with -h flag', matchSnapshot, '-h')
test('shows help with --help flag', matchSnapshot, '--help')
test('shows version information with -v flag', matchSnapshot, '-v')
test('shows version information with --version flag', matchSnapshot, '--version')

test('rejects promise due to error on passing in an unknown command', t => {
  const {stderr} = run(['junkcmd'], {reject: false})
  t.snapshot(stderr)
})
