import executable from 'rollup-plugin-executable'
import cleanup from 'rollup-plugin-cleanup'

module.exports = {
  input: 'lib/cli.js', // Entry file
  plugins: [
    executable(),
    cleanup()
  ],
  output: {
    file: 'bin/docsify',
    format: 'cjs', // Compiles to CJS
    banner: '#!/usr/bin/env node' // Adds node shebang on top of the file
  }
}
