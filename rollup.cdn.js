import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { getComponentsFolders, getFiles } from './scripts/buildUtils';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const packageJson = require('./package.json');

const commonPlugins = [
  replace({
    preventAssignment: true,
    __IS_DEV__: process.env.NODE_ENV === 'development',
  }),
  resolve(),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json',
    useTsconfigDeclarationDir: true,
  }),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs.js',
      exports: 'named',
      format: 'umd',
      banner: `'use client';`,
      name: 'umdBundle',
      globals: {
        
      },
    },
    plugins: commonPlugins,
    external: [/node_modules/],
  },
];
