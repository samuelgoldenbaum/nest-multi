import type { Config } from '@jest/types'
import { CompilerOptions } from 'typescript'
import * as compileData from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest'

const compilerOptions = (<{ compilerOptions: CompilerOptions }>(
  (<unknown>compileData)
)).compilerOptions

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  rootDir: '.',
  setupFiles: ['<rootDir>/test/setup.ts'],
  testEnvironment: 'node',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest'
  }
}

if (compilerOptions.paths) {
  config.moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/'
  })
}

export default config
