'use strict'

const osLocale = require('os-locale')
const path = require('path')
const Y18n = require('y18n')
const fse = require('fs-extra')

class Locales {

  constructor() {
    this.y18n = Y18n({
      directory: path.resolve(__dirname),
      updateFiles: false,
      locale: this.detectOsLocale()
    })
  }

  detectOsLocale() {
    let locale = this._getOsLocale()

    let exist = this._checkIfLocaleFileExist(locale)

    if (exist) {
      return locale
    }

    return 'en'
  }

  _getOsLocale() {
    let locale
    try {
      locale = osLocale.sync({ spawn: false })
    } catch (err) {
      locale = 'en'
    }

    return locale
  }

  _checkIfLocaleFileExist(locale) {
    let json = fse.readJsonSync(path.join(__dirname, `${locale.substring(0, 2)}.json`), { throws: false })

    return json != null
  }

  localized(key) {
    return this.y18n.__(key)
  }

}

module.exports = Locales
