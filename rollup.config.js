import executable from 'rollup-plugin-executable'

module.exports = {
  input: 'lib/cli.js', // Entry file
  plugins: [executable()],
  output: {
    file: 'bin/docsify',
    format: 'cjs', // Compiles to CJS
    banner: '#!/usr/bin/env node' // Adds node shebang on top of the file
  }
}
