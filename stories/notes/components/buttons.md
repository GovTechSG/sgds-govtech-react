# Usage

```Javascript
// Must import component from the react library first
import {Button} from 'sgds-govtech-react' 

<Button>This is a plain button</Button>
```
### Styling Properties
|Property|Description|
--- | --- |
isPrimary| Shades the button in the primary color style|
isOutline | Only outlines the button, should be used in conjunction with isPrimary|
isRounded | Rounds the button edges
isDisabled | Disables functionality of the button

```Javascript
<Button isPrimary> This is a primary button</Button>
<Button isPrimary isOutlined> This button is outlined</Button>
<Button isPrimary isRounded> This button is rounded</Button>
```

### Inserting icons
You can also insert icons from our library on any part of a button.
```Javascript
<Button>
    <span class="icon">
      <i class="sgds-icon sgds-icon-twitter"></i>
    </span>
    <span>Twitter</span>
</Button>
```
