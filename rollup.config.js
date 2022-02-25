import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import rename from 'rollup-plugin-rename';
import { terser } from 'rollup-plugin-terser';
const packageJson = require('./package.json');
import { getFiles, getFolders } from './scripts/buildUtils';
import copy from 'rollup-plugin-copy'

const extensions = ['.js', '.ts', '.jsx', '.tsx'];
const inputArray = [ ...getFiles('./src/components', extensions)]

const folderBuilds = getFolders('./src/components').map(folder=> {
  return {
    input: `src/components/${folder}/index.ts`, 
    output: {
      file: `build/${folder}.es.js`,
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'build',
      }),
      terser()
    ],
    external: ['react', 'react-dom'],
  }
})


export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: 'build/index.es.js',
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'build',
      }),
      terser()
    ],
    external: ['react', 'react-dom'],
  },
  ...folderBuilds,
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: 'build',
      }),
      terser(),
    ],
    external: ['react', 'react-dom'],
  },
];
