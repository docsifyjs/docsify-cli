'use strict'

const chalk = require('chalk')

exports.error = msg => console.error(chalk.red(msg))

exports.success = msg => console.log(chalk.green(msg))

