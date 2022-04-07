/* eslint-disable no-console */
const { resolve, join, basename } = require('path');
const { readFile, writeFile, copy } = require('fs-extra');
const packagePath = process.cwd();
const esmPath = join(packagePath, './dist/esm')
const cjsPath = join(packagePath, './dist/cjs')
const distPath = join(packagePath, './dist');
const fs = require('fs');


// const folderExports = getFolders('../src').map(name => {
//   return {
//     [name]: {
//       "import": `./${name}/index.mjs`,
//       "types": `./${name}/index.d.ts`
//     }
//   }
// })
const writeJson = (targetPath, obj) =>
  writeFile(targetPath, JSON.stringify(obj, null, 2), 'utf8');

async function createPackageFile() {
  const packageData = await readFile(
    resolve(packagePath, './package.json'),
    'utf8'
  );
  const { scripts, devDependencies, ...packageOthers } =
    JSON.parse(packageData);
  const newPackageData = {
    ...packageOthers,
    private: false,
    typings: './index.d.ts',
    // main: './cjs/index.js',
    module: './index.js',
    type: "module",
    // typings: 'esm/index.d.ts',
    // main: 'cjs/index.js',
    // module: 'esm/index.js',
    // // browser: './browser.js',
    // exports: {
    //   "." : {
    //     "require": './cjs/index.js',
    //     "import": './esm/index.js',
    //   },
    //   "./*": {
    //     "import": "./esm/*/index.js"
    //   }
    // }
  };

  const targetPath = resolve(distPath, './package.json');

  await writeJson(targetPath, newPackageData);
  console.log(`Created package.json in ${targetPath}`);
}

async function includeFileInBuild(file) {
  const sourcePath = resolve(packagePath, file);
  const targetPath = resolve(distPath, basename(file));
  await copy(sourcePath, targetPath);
  console.log(`Copied ${sourcePath} to ${targetPath}`);
}

async function run() {
  try {
    await createPackageFile();
    // await createPackageFile(cjsPath)
    await includeFileInBuild('./README.md');
    // await includeFileInBuild('../../LICENSE');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
