# Side Navigation Info Sheet

### Input Properties

| Property   | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| menuItems  | accepts a list of objects containing titles and links to be rendered (Example below)|

### links object structure
Links takes in a list of objects and renders them depending on the content of the objects.

```Javascript
[
  {
    title:'Item1',
    link:'#',
    isActive: false
  },
  {
    title:'Item2',
    subMenuItems: [
      {title:'SubItem1',link:'#'},
      {title:'SubItem2',link:'#'}
    ]
  },
  {
    title:'Item3',
    link:'#'
  },
]
```

### Customising the SideNav
By passing in children into the object you can overwrite the default <a> tag that is generated.
You can also open the nav by default by adding a isActive into the menuItems object
```Javascript
[
  {
    title:'Item1',
    link:'#',
  },
  { 
    title:'Item2',
    isActive:true,
    onClick:(id,isActive)=>{
      console.log(`test: ${MenuItems2[id].isActive}`);
      MenuItems2[id].isActive=isActive
    },
    subMenuItems:[
      {
        children:(          
          <a class="second-level-nav-item" href='#'>
            Passed in Child Link 1
          </a>
        )
      },
      {title:'SubItem2',link:'#'}
    ]
  },
  {
    children:(          
      <a href='#'>
        Item 3
      </a>
    )
  },
]
```
