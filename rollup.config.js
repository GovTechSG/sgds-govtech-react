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

// Returns rollup configuration for a given component
function component(commonPlugins, folder) {
  return {
    input: `src/${folder}/index.ts`,
    output: [
      {
        file: `dist/${folder}/index.esm.js`,
        exports: 'named',
        format: 'esm',
        banner: `'use client';`,
      },
      {
        file: `dist/${folder}/index.cjs.js`,
        exports: 'named',
        format: 'cjs',
        banner: `'use client';`,
      }
    ],
    plugins: [
      ...commonPlugins,
      generatePackageJson({
        baseContents: {
          name: `${packageJson.name}/${folder}`,
          private: true,
          main: './index.cjs.js',
          module: './index.esm.js',
          types: './index.d.ts',
          peerDependencies: packageJson.peerDependencies,
        },
        outputFolder: `dist/${folder}/`
      }),
    ],
    // Don't bundle node_modules and ../utils
    //
    // We should also exclude relative imports of other components, but a trivial exclude of /\.\./ does not work
    // It may require changes to the way the components are exported
    external: [/node_modules/, /\.\.\/utils/],
  };
}

export default [
  // Build ./src/utils
  {
    input: getFiles('src/utils', ['js', 'ts', 'tsx']),
    output: {
      dir: 'dist/utils/',
      format: 'esm',
    },
    plugins: commonPlugins,
    external: [/node_modules/],
  },

  // Build all components in ./src/*
  ...getComponentsFolders('./src').map((folder) => component(commonPlugins, folder)),

  // Build the main file that includes all components and utils
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.esm.js',
        exports: 'named',
        format: 'esm',
      },
      {
        file: 'dist/index.cjs.js',
        exports: 'named',
        format: 'cjs',
      }
    ],
    plugins: commonPlugins,
    external: [/node_modules/],
  },
];
