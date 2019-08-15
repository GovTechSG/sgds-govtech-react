# sgds-govtech-react

React components powered by [Singapore Government Design System](https://www.designsystem.gov.sg).

We are in early development! If you are trying out sgds-govtech-react, feel free to leave us feedback in the issues page, or even submit a [PR](https://github.com/govtechsg/sgds-govtech-react/pulls)!

## Installation
```
npm install sgds-govtech-react
```
## Usage

### You will need to first import the [sgds](https://www.designsystem.gov.sg) css styles, either in your website's `<head>` element or through your frontend build.

#### HTML
```html
<head>
    <link
        rel="stylesheet"
        href="https://unpkg.com/sgds-govtech/css/sgds.css"
    />
</head>
```

#### Webpack

```javascript
// In your entry point

import 'sgds-govtech/sass/sgds.css'
```

### Getting started

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
V0.1.2: Added footer and masthead to component library
