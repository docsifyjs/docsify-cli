'use strict';

const path = require('path');
const execa = require('execa');
const test = require('ava');

const rootCommand = path.join(process.cwd(), 'bin/docsify');

test('shows up help message without any args', async t => {
    const { stderr } = await execa(rootCommand, {reject: false});
    t.snapshot(stderr)
});