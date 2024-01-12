# Usage with Jest 

Jest support for ESM modules is still experimental. Configure jest to transpile the package like so

## `jest.config.js`

```js
...
transformIgnorePatterns: [
    "/node_modules/(?!(@govtechsg/sgds-react)/)",
  ]
```

## `next/js`

```js
async function jestConfig() {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  // /node_modules/ is the first pattern
  nextJestConfig.transformIgnorePatterns[0] = '/node_modules/(?!uuid)/'
  return nextJestConfig
}

module.exports = jestConfig
```
