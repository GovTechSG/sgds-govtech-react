# Usage with Next.js

## "use client" directive

Our components are client side components and will require the "use client" directive in Next.js

For versions before 2.3.0 , add "use client" in files where you import our components

```jsx
'use client';
import { Alert } from '@govtechsg/sgds-react';
import React from 'react';

const App: React.FC = () => (
  <Alert key={idx} variant={variant} className="d-flex align-items-center">
    <i className="bi bi-exclamation-circle me-4"></i>
    <div>
      This is a {variant} alert with
      <Alert.Link href="#">an example link</Alert.Link>. Give it a click if you
      like.
    </div>
  </Alert>
);

export default App;
```

Since version 2.3+ , "use client" directive are incorporated in the components itself. Hence, you do not need to add the "use client" directive when importing the components. 

```jsx
import { Alert, AlertLink } from '@govtechsg/sgds-react';
import React from 'react';

const App: React.FC = () => (
  <Alert key={idx} variant={variant} className="d-flex align-items-center">
    <i className="bi bi-exclamation-circle me-4"></i>
    <div>
      This is a {variant} alert with
      <AlertLink href="#">an example link</AlertLink>. Give it a click if you
      like.
    </div>
  </Alert>
);

export default App;
```

**Note** Notice the example above imports and uses `AlertLink` instead of `Alert.Link`. Due to an [upstream issue from Next.js](https://github.com/vercel/next.js/issues/51593), you cannot use sub components like `Alert.Link` as with the first example where "use client" directive was used. If you use it, you will face an error:

`Error: Cannot access .Option on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.` 