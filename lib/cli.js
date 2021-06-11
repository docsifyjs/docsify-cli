const chalk = require('chalk')
const updateNotifier = require('update-notifier')

const pkg = require('../package.json')
const run = require('../lib')

updateNotifier({pkg: pkg}).notify()

const Locales = require('../tools/locales')
const y18n = new Locales()

require('yargonaut')
  .style('yellow', 'required')
  .helpStyle('green')
  .errorsStyle('red.bold')

require('yargs')
  .demandCommand(1, chalk.red('[ERROR] 0 arguments passed. Please specify a command'))
  .strict()
  .recommendCommands()
  .usage(chalk.bold(y18n.__('usage') + ': docsify <init|serve> <path>'))
  .command({
    command: 'init [path]',
    aliases: 'i',
    desc: chalk.gray(y18n.__('init')),
    builder: yargs =>
      yargs.options({
        local: {
          alias: 'l',
          default: false,
          desc: chalk.gray(y18n.__('init.local')),
          nargs: 0,
          requiresArg: false,
          type: 'boolean'
        },
        theme: {
          alias: 't',
          default: 'vue',
          desc: chalk.gray(y18n.__('init.theme')),
          choices: ['vue', 'buble', 'dark', 'pure'],
          nargs: 1,
          requiresArg: true,
          type: 'string'
        },
        plugins: {
          alias: 'p',
          default: false,
          desc: chalk.gray(y18n.__('init.plugins')),
          nargs: 0,
          requiresArg: false,
          type: 'boolean'
        }
      }),
    handler: argv => run.init(argv.path, argv.local, argv.theme, argv.plugins)
  })
  .command({
    command: 'serve [path]',
    aliases: 's',
    desc: chalk.gray(y18n.__('serve')),
    builder: yargs =>
      yargs.options({
        open: {
          alias: 'o',
          default: false,
          desc: chalk.gray(y18n.__('serve.open')),
          nargs: 0,
          requiresArg: false,
          type: 'boolean'
        },
        port: {
          alias: 'p',
          default: 3000,
          desc: chalk.gray(y18n.__('serve.port')),
          nargs: 1,
          requiresArg: true,
          type: 'number'
        },
        'livereload-port': {
          alias: 'P',
          default: 35729,
          desc: chalk.gray(y18n.__('livereload.port')),
          nargs: 1,
          requiresArg: true,
          type: 'number'
        },
        'index-name': {
          alias: 'i',
          desc: chalk.gray(y18n.__('serve.indexname')),
          nargs: 1,
          requiresArg: true,
          type: 'string'
        }
      }),
    handler: argv => run.serve(argv.path, argv.open, argv.port, argv.P, argv.i)
  })
  .command({
    command: 'start <path>',
    desc: chalk.gray(y18n.__('start')),
    builder: yargs =>
      yargs.options({
        config: {
          alias: 'c',
          default: false,
          desc: chalk.gray(y18n.__('start.config')),
          nargs: 1,
          requiresArg: false,
          type: 'string'
        },
        port: {
          alias: 'p',
          default: 4000,
          desc: chalk.gray(y18n.__('start.port')),
          nargs: 1,
          requiresArg: true,
          type: 'number'
        }
      }),
    handler: argv => run.start(argv.path, argv.config, argv.port)
  })
  .command({
    command: 'generate <path>',
    aliases: 'g',
    desc: chalk.gray(y18n.__('generate')),
    builder: yargs =>
      yargs.options({
        sidebar: {
          alias: 's',
          default: '_sidebar.md',
          desc: chalk.gray(y18n.__('gen.sidebar')),
          nargs: 1,
          requiresArg: true,
          type: 'string'
        }
      }),
    handler: argv => run.generate(argv.path, argv.sidebar)
  })
  .help()
  .option('help', {
    alias: 'h',
    type: 'boolean',
    desc: chalk.gray(y18n.__('help')),
    group: chalk.green(y18n.__('group.globaloptions'))
  })
  .version('\ndocsify-cli version:\n  ' + pkg.version + '\n')
  .option('version', {
    alias: 'v',
    type: 'boolean',
    desc: chalk.gray(y18n.__('version')),
    group: chalk.green(y18n.__('group.globaloptions'))
  })
  .epilog(chalk.gray(y18n.__('epilog'))).argv
