# docsify-cli

[![Build Status master branch](https://img.shields.io/travis/QingWei-Li/docsify-cli/master.svg?style=flat-square)](https://travis-ci.org/QingWei-Li/docsify-cli)
[![License](https://img.shields.io/github/license/QingWei-Li/docsify-cli.svg?style=flat-square)](https://github.com/QingWei-Li/docsify-cli/blob/master/LICENSE)
[![Github tag](https://img.shields.io/github/tag/QingWei-Li/docsify-cli.svg?style=flat-square)](https://github.com/QingWei-Li/docsify-cli/tags)
[![npm version](https://img.shields.io/npm/v/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)
[![npm total downloads](https://img.shields.io/npm/dt/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)
[![npm total monthly](https://img.shields.io/npm/dm/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)

> 🖌 docsify cli - A magical documentation generator.

## Links

* [docsify](https://github.com/QingWei-Li/docsify)

## Screenshots

![](https://cloud.githubusercontent.com/assets/7565692/20603335/10bf80a0-b29c-11e6-93bb-5c3187f76edd.gif)

## Installation

```shell
npm i docsify-cli -g
# yarn global add docsify-cli
```

## Usage

### init

Creates the docs, by default in the current directory.

```shell
docsify init [path]
```

#### options

| Short | Long | Description |
|---|---|---|
| `-l` | `--local` | Copy `docsify` to docs path, default use `unpkg.com` cdn |
| `-t` | `--theme` | Choose theme, default `vue.css` |

### serve - run serve to preview

```shell
docsify serve [path]
```

| Short | Long | Description |
|---|---|---|
| `-p` | `--port` | Listen port, defaults to 3000. |

## License

MIT
