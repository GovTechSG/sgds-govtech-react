# Accordion Info Sheet

## Content props

These props control the content of the `<Accordion>` component

| Prop   | Description                                             |
| ------ | ------------------------------------------------------- |
| header | String. Sets the string shown in the accordion's header |

## Control props

These _optional_ props allow finer control of the behaviour of the `<Accordion>` component.

| Prop          | Description                                                                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| initiallyOpen | Boolean. If set, the accordion will display its contents on first render                                                                                                                |
| isActive      | Boolean. If true, accordion is always open. If false, accordion will always be closed.                                                                                                  |
| onHeaderClick | Function. Allows custom behaviour when headers are clicked. For example, usage of `isActive` with `onHeaderClick` allows control of accordion display state from outside the component. |
