# sgds-govtech-react

React components powered by [Singapore Government Design System](https://www.designsystem.gov.sg).

React Documentation can be found [here](https://govtechsg.github.io/sgds-govtech-react) - [https://govtechsg.github.io/sgds-govtech-react](https://govtechsg.github.io/sgds-govtech-react)

We are in early development! If you are trying out sgds-govtech-react, feel free to leave us feedback in the issues page, or even submit a [PR](https://github.com/govtechsg/sgds-govtech-react/pulls)!

## Installation
```
npm install sgds-govtech-react
```
## Usage

You will need to first import the [sgds](https://www.designsystem.gov.sg) css styles, either in your website's `<head>` element or through your frontend build.

For example, `create-react-app` users should insert the css into the `<head>` of `public/index.html`

```html
<head>
    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/sgds-govtech@1.3.15/css/sgds.css"
    />
</head>
```

Alternatively, install the `sgds-govtech` package:

```bash
npm install sgds-govtech
```

And import the `css` through your bundler:

```javascript
// In your entry point
import 'sgds-govtech/css/sgds.css';
```

## Customisation (advanced)

If you want to modify SGDS's base styling, you can import the Sass source (your project needs to support Sass compilation) and modify SGDS variables.

```
npm install sgds-govtech
```

For example, importing sgds in your own sass file:

```scss
// styles/app.scss

// Override SGDS defaults
$primary: rgb(8, 11, 56);
$secondary: #ff8c00;
$warning: rgb(134, 37, 37);

// This must be overridden if you want to use icons! See below for more details
$sgds-font-path: "../../../fonts";

// Import all of sgds
@import "~sgds-govtech/sgds/sass/sgds.scss";
```

Then, in your app:

```js
import React from "react";

import "./styles/app.scss";

export default function App() {
    return <div>...</div>
}
```

For more information on customising with Sass, see the [SGDS documentation](https://www.designsystem.tech.gov.sg/docs/customise-sgds/).

## Getting started

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

import { Button } from "sgds-govtech-react";

const app = () => {
    return (
        <div className="App">
            <Button>Submit</Button>
        </div>
    )
}

ReactDOM.render(
  app,
  document.getElementById('root')
);
```

### Patch Notes
V0.1.7: Added Sidenav, Tab and their storybook documentation to the library
V0.1.2: Added footer and masthead to component library
