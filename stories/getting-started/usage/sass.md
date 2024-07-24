# Customisation with Sass

You can change the base styles through overriding the sass variables. Find the whole list of sass variables <a href="https://github.com/GovTechSG/sgds/blob/v2/lib/sgds/sass/_variables.scss" target="_blank">here</a>.

> Pre-requisite: Setup sass loader in your project and complete installation instructions <a href="/story/getting-started-installation--page" target="_self">here</a>.

> Make sure you have `@govtechsg/sgds` library installed.

## Basic customisation

Basic customisation involves overriding of variables that consist of a simple primitive css value. If you would like to override complex variables e.g. a map of colours, please refer to the next section on `Advanced Customisation`

```css
// In styles/app.scss

// Step 1: Override SGDS defaults
$primary: rgb(8, 11, 56);
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

## Advanced customisation

### Example: Change SGDS primary colour

In this example, we want to replace the all of the primary colour of SGDS. We do that via overriding the `$primary` and `$primarys` !default variables. To ensure any downstream dependencies related to `$primary`and `$primarys` also follow the same colour(s), we will update the following as well:

1. `$theme-colors`,
2. `$theme-colors-rgb`,
3. `$theme-colors-set`,
4. `$utilities-color`,
5. `$utilities-text-colors`,
6. `$utilities-bg-colors`

```css
// Step 1: Include functions, variables ,mixins and utilities as you will likely need to use them for customisation
@import '@govtechsg/sgds/sass/functions';
@import '@govtechsg/sgds/sass/variables';
@import '@govtechsg/sgds/sass/mixins';
@import '@govtechsg/sgds/sass/utilities';

// Step 2: Override the !default variables here.
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

// Step 3: Update related downstream dependencies
$theme-colors: map-merge(
  $theme-colors,
  (
    'primary': $primary,
  )
);
$theme-colors-rgb: map-loop($theme-colors, to-rgb, '$value');
$theme-colors-set: map-merge(
  $theme-colors-set,
  (
    'primary': $primarys,
  )
);

$utilities-colors: map-merge($utilities-colors, $theme-colors-rgb);
$utilities-text-colors: map-loop(
  $utilities-colors,
  rgba-css-var,
  '$key',
  'text'
);
$utilities-bg-colors: map-loop($utilities-colors, rgba-css-var, '$key', 'bg');

// Step 3: Update components that you want to follow the $primary colour changes
$progress-bar-bg: $primary;
...

//Step 4: Import all of sgds styles
@import '@govtechsg/sgds/sass/sgds';
```
