'use strict'

const path = require('path')
const Y18n = require('y18n')
const fse = require('fs-extra')

class Locales {

  constructor () {
    this.y18n = Y18n({
      directory: path.resolve(__dirname),
      updateFiles: false,
      locale: this.detectLocale()
    })
  }

  detectLocale () {
    const yargs = require('yargs')
      .detectLocale(true)

    const locale = yargs.locale()

    const exist = this._existsLocaleFile(locale)

    if (exist) {
      return locale
    }

    return 'en'
  }

  _existsLocaleFile (locale) {
    const json = fse.readJsonSync(path.join(__dirname, `${locale.substring(0, 2)}.json`), { throws: false })

    return json != null
  }

  __ (str) {
    return this.y18n.__(str)
  }

  __n (singularString, pluralString, count) {
    return this.y18n.__n(singularString, pluralString, count)
  }

}

module.exports = Locales
