# docsify-cli
[![Build Status](https://travis-ci.org/QingWei-Li/docsify-cli.svg?branch=master)](https://travis-ci.org/QingWei-Li/docsify-cli)
[![npm](https://img.shields.io/npm/v/docsify-cli.svg)](https://www.npmjs.com/package/docsify-cli)

> 🖌 docsify cli - A magical documentation generator.

## Links
- [docsify](https://github.com/QingWei-Li/docsify)

## Screenshots
![](https://cloud.githubusercontent.com/assets/7565692/20603335/10bf80a0-b29c-11e6-93bb-5c3187f76edd.gif)

## Installation
```shell
npm i docsify-cli -g
# yarn global add docsify-cli
```


## Usage

### init - create a docs
```shell
docsify init [path]
```

#### options
- `-l --local` Copy `docsify` to docs path, default use `unpkg.com` cdn
- `-t --theme` Choose theme, default `vue.css`

### serve - run serve to preview
```shell
docsify serve [path]
```

- `-p --port` Listen port, default 3000

## License
MIT
