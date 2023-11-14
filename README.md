# @govtechsg/sgds-react

React components powered by [Singapore Government Design System](https://www.designsystem.gov.sg)

`@govtechsg/sgds-react` take references from [react-bootstrap](https://react-bootstrap.github.io/)

## Version Compatibility

See the below table on which version of `@govtechsg/sgds` you should be using in your project.

| @govtechsg/sgds version | @govtechsg/sgds-react version |
| ----------------------- | ----------------------------- |
| v2.x                    | v2.x                          |

## Installation

`@govtechsg/sgds-react` is not shipped with any included CSS. Apply `@govtechsg/sgds@latest` styles by installing the module or using CDN.

`@govtechsg/sgds-react` uses `bootstrap-icons` for certain components like Form, but does not ship with it. Install `bootstrap-icons` or use CDN if you need it. Please refer to [bootstrap-icons](https://icons.getbootstrap.com/#usage) for usage instructions

```js

npm install @govtechsg/sgds-react

//not required if using CDN
npm install @govtechsg/sgds bootstrap-icons

```

## Importing Components

You should import individual components like: `@govtechsg/sgds-react/Button` rather than the entire library. Doing so pulls in only the specific components that you use, which can significantly reduce the amount of code you end up sending to the client.

```js
import { Button } from '@govtechsg/sgds-react/Button';

// or less ideally
import { Button } from '@govtechsg/sgds-react';
```

## Stylesheets

#### Using CSS / SASS

```js
// In your entry point
// import CSS or
import '@govtechsg/sgds/css/sgds.css';
// import SASS
import '@govtechsg/sgds/sass/sgds.scss';
```

#### Using CDN

```js

//index.html
<link href='https://designsystem.gov.sg/css/sgds.css' rel='stylesheet' type='text/css'/>

//index.css
@import url('https://designsystem.gov.sg/css/sgds.css');

```

# Advanced Usage

## Customisation with Sass

If you want to modify SGDS's base styling, you can import the Sass source (your project needs to support Sass compilation) and [override SGDS's sass variables](https://www.designsystem.tech.gov.sg/get-started/customise-with-sass).

```
npm install @govtechsg/sgds
```

For example, importing sgds in your own sass file:

```scss
// styles/app.scss

// Override SGDS defaults
$primary: rgb(8, 11, 56);
$secondary: #ff8c00;
$warning: rgb(134, 37, 37);

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

For more information on customising with Sass, see the [SGDS documentation](https://www.designsystem.tech.gov.sg/get-started/customise-with-sass).

## "as" Prop API

With certain SGDS React components, you may want to modify the component or HTML tag that is rendered.

If you want to keep all the styling of a particular component but switch the component that is finally rendered (whether it's a different SGDS React component, a different custom component, or a different HTML tag), you can use the "as" Prop to do so.

See [example](https://react-bootstrap.github.io/docs/getting-started/introduction#as-prop-api)
