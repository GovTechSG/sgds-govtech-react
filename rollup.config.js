import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
const packageJson = require('./package.json');
import { getFolders } from './scripts/buildUtils';


const extensions = ['.js', '.ts', '.jsx', '.tsx'];
// const inputArray = [ ...getFiles('./src/components', extensions)]
const plugins =  [
    peerDepsExternal(),
    resolve(),
    replace({
      __IS_DEV__: process.env.NODE_ENV === 'development'
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
    }),
    terser()
  ]
const folderBuilds = getFolders('./src').map(folder=> {
  return {
    input: `src/${folder}/index.ts`, 
    output: {
      file: `dist/${folder}/index.js`,
      sourcemap: true,
      exports: 'named',
    },
    plugins,
    external: ['react', 'react-dom'],
  }
})


export default [
  {
    input: ['src/index.ts'],
    output: [
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins,
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
    plugins,
    external: ['react', 'react-dom'],
  },
];
