'use strict';

const path = require('path');
const execa = require('execa');
const test = require('ava');

const rootCommand = path.join(process.cwd(), 'bin/docsify');

test('shows up help message without any args', async t => {
    const { stderr } = await execa(rootCommand, {reject: false});
    t.snapshot(stderr);
});

test('shows up help message by passing in --help flag', async t => {
    const { stdout } = await execa(rootCommand, ['--help']);
    t.snapshot(stdout);
});

test('shows up help message by passing in -h flag', async t => {
    const { stdout } = await execa(rootCommand, ['-h']);
    t.snapshot(stdout);
});