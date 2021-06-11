<p align="center">
  <a href="https://docsify.js.org">
    <img alt="docsify" src="./media/icon.svg">
  </a>
</p>

<p align="center">
 🖌 docsify cli - A magical documentation generator.
</p>

<p align="center">
  <a href="#backers"><img alt="Backers on Open Collective" src="https://opencollective.com/docsify/backers/badge.svg?style=flat-square"></a>
  <a href="#sponsors"><img alt="Sponsors on Open Collective" src="https://opencollective.com/docsify/sponsors/badge.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/docsify"><img alt="npm" src="https://img.shields.io/npm/v/docsify-cli.svg?style=flat-square"></a>
  <a href="https://github.com/docsifyjs/docsify-cli/actions"><img alt="Github Actions Status" src="https://github.com/docsifyjs/docsify-cli/workflows/docsify-cli/badge.svg"></a>
<a href="https://discord.gg/3NwKFyR"><img alt="Join Discord community and chat about Docsify" src="https://img.shields.io/discord/713647066802421792.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2&cacheSeconds=60"></a>
<a href="https://github.com/docsifyjs/docsify-cli/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/github/license/docsifyjs/docsify-cli.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/docsify-cli"><img alt="npm-total-download" src="https://img.shields.io/npm/dt/docsify-cli.svg?style=flat-square"></a>
<a href="https://www.npmjs.com/package/docsify-cli"><img alt="npm-monthly-download" src="https://img.shields.io/npm/dm/docsify-cli.svg?style=flat-square"></a>

</p>

<p align="center">Gold Sponsor via <a href="https://opencollective.com/docsify">Open Collective</a></p>

<p align="center">
  <a href="https://opencollective.com/docsify/order/3254">
    <img src="https://opencollective.com/docsify/tiers/gold-sponsor.svg?avatarHeight=36">
  </a>
</p>

## Screencast

![Screencast](https://raw.githubusercontent.com/docsifyjs/docsify-cli/master/media/screencast.gif)

> Running a server on `localhost` with live-reload.

## Installation

Install `docsify-cli` via `npm` or `yarn` globally.

```shell
npm i docsify-cli -g
# yarn global add docsify-cli
```

## Usage

### `init` command

Use `init` to generate your docs.

```shell
docsify init <path> [--local false] [--theme vue] [--plugins false]

# docsify i <path> [-l false] [-t vue] [--plugins false]
```

`<path>` defaults to the current directory. Use relative paths like `./docs` (or `docs`).

- `--local` option:
  - Shorthand: `-l`
  - Type: boolean
  - Default: `false`
  - Description: Copy `docsify` files to the docs path, defaults to `false` using `cdn.jsdelivr.net` as the content delivery network (CDN). To explicitly set this option to `false` use `--no-local`.
- `--theme` option:
  - Shorthand: `-t`
  - Type: string
  - Default: `vue`
  - Description: Choose a theme, defaults to `vue`, other choices are `buble`, `dark` and `pure`.
- `--plugins` option:
  - Shorthand: `-p`
  - Type: boolean
  - Default: `false`
  - Description: Provide a list of plugins to insert as `<script>` tags to `index.html`.

### `serve` command

Run a server on `localhost` with livereload.

```shell
docsify serve <path> [--open false] [--port 3000]

# docsify s <path> [-o false] [-p 3000]
```

- `--open` option:
  - Shorthand: `-o`
  - Type: boolean
  - Default: `false`
  - Description: Open the docs in the default browser, defaults to `false`. To explicitly set this option to `false` use `--no-open`.
- `--port` option:
  - Shorthand: `-p`
  - Type: number
  - Default: `3000`
  - Description: Choose a listen port, defaults to `3000`.

### `generate` command

Docsify's generators.

```shell
docsify generate <path> [--sidebar _sidebar.md]

# docsify g <path> [-s _sidebar.md]
```

- `--sidebar` option:
  - Shorthand: `-s`
  - Type: string
  - Default: `_sidebar.md`
  - Description: Generate sidebar file, defaults to `_sidebar.md`.

## Contributing
Please see the [Contributing Guidelines](./CONTRIBUTING.md)

## Contribution

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/docsifyjs/docsify-cli)

## License

[MIT](LICENSE)
