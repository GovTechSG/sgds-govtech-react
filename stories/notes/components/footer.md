# Footer Info Sheet

### Input Properties

| Property   | Description                                                            |
| ---------- | ---------------------------------------------------------------------- |
| date  | Updates both the copyrights and last updated fields with the date entered.|
| links  | Commonly used links amongst all government websites, you can see an example of the object below |
| title  | Renders the title within the footer element |

### Adding commonly used links built into footer
The footer will only render the following fixed links if it is passed in through the links prop object

```Javascript
{
  privacy: "http://link.com",
  termsOfUse: "http://link.com",
  contact: "http://link.com",
  feedback: "http://link.com"
}
```



