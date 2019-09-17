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
    link:'#'
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

