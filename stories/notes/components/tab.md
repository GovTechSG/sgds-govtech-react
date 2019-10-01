# Tab Info Sheet

### Input Properties

| Property   | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| className | You can apply an outer style to the containing div of the tab component|
| tabItems  | accepts a list of objects containing titles and links to be rendered as a tab(Example below)|

### tab object structure
The tabItems object should contain a title, icon and content.
Content can be any JSX nested block child.

```Javascript
[
  {
    title:'Tab 1',
    icon:'sgds-icon-boat',
    content:(  
      <div className="col">
        <h5>Tab 1 Content</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eos fugiat in
          incidunt mollitia quam qui totam vel veritatis vero.
        </p>
      </div>
    )
  },
  {
    title:'Tab 2',
    icon:'sgds-icon-bus',
    content:(  
      <div className="col">
        <h5>Tab 2 Content</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eos fugiat in
          incidunt mollitia quam qui totam vel veritatis vero.
        </p>
      </div>
    )
  },
  {
    title:'Tab 3',
    icon:'sgds-icon-train',
    content:(  
      <div className="col">
        <h5>Tab 3 Content</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores eos fugiat in
          incidunt mollitia quam qui totam vel veritatis vero.
        </p>
      </div>
    )
  }
]
```
