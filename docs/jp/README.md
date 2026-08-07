# docsify-cli

[![Build Status master branch](https://github.com/docsifyjs/docsify-cli/workflows/docsify-cli/badge.svg)](https://github.com/docsifyjs/docsify-cli/actions)
[![License](https://img.shields.io/github/license/docsifyjs/docsify-cli.svg?style=flat-square)](https://github.com/docsifyjs/docsify-cli/blob/master/LICENSE)
[![Github tag](https://img.shields.io/github/tag/docsifyjs/docsify-cli.svg?style=flat-square)](https://github.com/docsifyjs/docsify-cli/tags)
[![npm version](https://img.shields.io/npm/v/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)
[![npm total downloads](https://img.shields.io/npm/dt/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)
[![npm total monthly](https://img.shields.io/npm/dm/docsify-cli.svg?style=flat-square)](https://www.npmjs.com/package/docsify-cli)

> 🖌 docsify cli - 魔法のドキュメントジェネレーター。

## リンク

* [docsify](https://github.com/docsifyjs/docsify)

## スクリーンショット

![Screencast](https://raw.githubusercontent.com/docsifyjs/docsify-cli/master/media/screencast.gif)

> live-reloadを使用して `localhost` 上にサーバーを起動しています。

## インストール

`docsify-cli`を`npm`か`yarn`を経由して、グローバルにインストールします。

```shell
npm i docsify-cli -g
# yarn global add docsify-cli
```

## 使い方

### `init` コマンド

`init` を使ってあなたのドキュメントを作成します。

```shell
docsify init <path> [--local false] [--theme vue] [--plugins false]

# docsify i <path> [--local false] [--theme vue] [--plugins false]
```

`<path>` のデフォルトではカレントディレクトリ（現在のディレクトリ）です。`./docs` (または `docs`)などの相対パスを使用します。

* `--local` オプション:
  * 省略: `-l`
  * タイプ: boolean
  * デフォルト: `false`
  * 説明: `docsify` ファイルをドキュメントのパスにコピーします。`unpkg.com`をcontent delivery network (CDN)として使用するとデフォルトではfalseになります。 このオプションを明示的に `false` に設定するためには、 `--no-local` を使用します 。
* `--theme` オプション:
  * 省略: `-t`
  * タイプ: string
  * デフォルト: `vue`
  * 説明: テーマを選択します。 デフォルトは `vue`です。 ほかの選択肢は `buble`と `dark` と `pure`です。
* `--plugins` オプション:
  * 省略: `-p`
  * タイプ: array
  * デフォルト: `[]`
  * 説明: `<script>` タグとして `index.html`に挿入するプラグインのリストを提供します。

### `serve` コマンド
livereloadを使用して、`localhost`にサーバーを起動します。

```shell
docsify serve <path> [--open false] [--port 3000]

# docsify s <path> [--open false] [--port 3000]
```

* `--open` option:
  * 省略: `-o`
  * タイプ: boolean
  * デフォルト: `false`
  * 説明: ドキュメントをデフォルトのブラウザーで開きます。デフォルトでは `false`　です。 このオプションを明示的に`false`に設定するために `--no-open`を使用します。
* `--port` option:
  * 省略: `-p`
  * タイプ: number
  * デフォルト: `3000`
  * 説明: 待ち受けポートを選択します。 デフォルトでは　`3000`　です。

## ライセンス

MIT
