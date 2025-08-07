import {defineConfig, globalIgnores} from 'eslint/config'
import path from 'node:path'
import {fileURLToPath} from 'node:url'
import js from '@eslint/js'
import {FlatCompat} from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
})

export default defineConfig([globalIgnores(['**/.git/']), {
  extends: compat.extends('xo-space'),

  rules: {
    semi: [2, 'never'],
    'no-return-assign': 'off',
    'no-unused-expressions': 'off',
    'no-new-func': 'off',
    'no-multi-assign': 'off',
    'no-mixed-operators': 'off',
    'max-params': 'off',
    'no-script-url': 'off',
    camelcase: 'off',
    'no-warning-comments': 'off'
  }
}])
