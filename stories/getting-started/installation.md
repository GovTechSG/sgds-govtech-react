# Step 1: Install SGDS react

React components powered by <a target="_blank" href="https://www.designsystem.gov.sg">Singapore Government Design System</a>

Some components in the library uses Bootstrap icons for certain components like Form, but does not ship with it. Install bootstrap-icons or use CDN if you need it. Please refer to <a href="https://icons.getbootstrap.com/#install" target="_blank">Bootstrap icons</a> for usage instructions

```js

npm install @govtechsg/sgds-react

```

# Step 2: Set up stylesheets

The SGDS react library is not shipped with any included CSS. Apply `@govtechsg/sgds@latest` styles by installing the module or using CDN.

## Method 1: Local installation

```js

npm install @govtechsg/sgds
```

Importing of stylesheet in the entry point of your application

```js
// In the entry point
import '@govtechsg/sgds/css/sgds.css';
```

## Method 2: Using CDN

```js
//In index.html
<link
  href="https://cdn.jsdelivr.net/npm/@govtechsg/sgds@__VERSION__/css/sgds.css"
  rel="stylesheet"
  type="text/css"
/>
```

# Step 3: Import components

You may import individual components or import all components at once. It is recommended to cherry pick components rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

## Import individual component

Below is an example of importing a single button component. More components to import <a target="_self" href="/story/components-accordion--basic">here</a>.

```js

import { Button } from '@govtechsg/sgds-react/Button';

```

## Import all components

Import from the entry point of the component library.

```js

import { Button } from '@govtechsg/sgds-react';

```

# Step 4: Start building your application

After completing step 1-3, you are now ready to build your own application. There are ready made patterns and templates to use. You may refer to the <a target="_self" href="/story/components-accordion--basic">components</a>, <a target="_self" href="/story/patterns-address--address">patterns</a> or <a target="_self" href="/story/templates-collapsible-single-page-form--collapsible-single-page-form">templates</a> page to find out more.
