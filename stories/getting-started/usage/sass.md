# Customisation with Sass

You can change the base styles through overriding the sass variables. Find the whole list of sass variables <a href="https://github.com/GovTechSG/sgds/blob/v2/lib/sgds/sass/_variables.scss" target="_blank">here</a>.

> Pre-requisite: Setup sass loader in your project and complete installation instructions <a href="/story/getting-started-installation--page" target="_self">here</a>.

> Make sure you have `@govtechsg/sgds` library installed.

## Basic customisation

Basic customisation involves overriding of variables that consist of a simple primitive css value. If you would like to override complex variables e.g. a map of colours, please refer to the next section on `Advanced Customisation`

```css
// In styles/app.scss

// Step 1: Override SGDS defaults
$primary: #3fb247;
$primarys: (
  'primary-100': #52e85c,
  'primary-200': #4dd956,
  'primary-300': #39a340,
  'primary-400': #3ba442,
  'primary-500': #3fb247,
  'primary-600': #308636,
  'primary-700': #1b4a1e,
  'primary-800': #0f2b11,
  'primary-900': #020502,
);
$secondary: #ff8c00;
$warning: rgb(134, 37, 37);
$enable-cssgrid: true;

// Import all of sgds
@import '@govtechsg/sgds/sass/sgds.scss';
```

Then, in your app:

```js
import React from 'react';

import './styles/app.scss';

export default function App() {
  return <div>...</div>;
}
```