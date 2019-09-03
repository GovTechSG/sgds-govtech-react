# Main Navigation Info Sheet

### Input Properties

| Property   | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| brand  | Shades the button in the primary color style                           |
| links  | List of objects containing links, the structure of the object will determine if the sub menu is a mega menu or just a list |
| displaySearch  | Adds a search functionality to the main nav bar|

### links object structure
Links takes in a list of objects and renders them depending on the content of the objects.

#### Mega Menus

```Javascript

{
  img: "",
  name: "MEGA MENU1",
  subMenuInfo: {
    title: "Sub Menu 1 Info",
    content:
      "You can put short paragraph of information here to describe about this section."
  },
  subMenus: [
    {
      subMenuTitle: "SUB MENU 1A",
      subMenuItems: [
        {
          name: "Sub Link 1",
          link: "#link1"
        },...
      ]
    },...
  ]
} 

```

#### Regular Link Dropdown Menus

```Javascript
{
  {
    img: "",
    name: "Link2",
    sublinks: [
      {
        img: "",
        name: "SubLink2-1"
      },...
    ]
  },
} 
```

#### Simple Link Menus

```Javascript
{
  img: "",
  name: "Link3",
  link: "/"
}
```


### Event handlers

| Property | Description                   |
| -------- | ----------------------------- |
| selectItem  | Pass a item selected handler |
| searchChangeHandler | onChange handler for search input|
| searchClickHandler | onClick handler when user clicks search button
