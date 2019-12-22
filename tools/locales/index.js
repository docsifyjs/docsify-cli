'use strict'

const path = require('path')
const Y18n = require('y18n')
const fse = require('fs-extra')

class Locales {
  constructor() {
    // eslint-disable-next-line
    this.y18n = Y18n({
      directory: path.resolve(__dirname),
      updateFiles: false,
      locale: this.detectLocale()
    })
  }

  detectLocale() {
    const yargs = require('yargs')

    const locale = yargs.locale()

    try {
      this._existsLocaleFile(locale)
    } catch (e) { // eslint-disable-line
      return 'en'
    }

    return locale
  }

  _existsLocaleFile(locale) {
    return fse.readJsonSync(path.join(__dirname, `${locale.substring(0, 2)}.json`))
  }

  __(str) {
    return this.y18n.__(str)
  }

  __n(singular, plural, count) {
    return this.y18n.__n(singular, plural, count)
  }
}

module.exports = Locales
