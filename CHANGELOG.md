## v2.4.0 (2024-03-22)

### Feat

- **pagination**: add prop to show first/last page on the pagination [skip-cd] (#216)
- **pagination**: add prop to show first/last page on the pagination
- **datepicker**: enhance datepicker accessibility [skip-cd] (#212)
- **datepicker**: sync up prop name as invalidFeedback with web component
- **datepicker**: validate date input onblur and onchange, add error message
- **datepicker**: handle min & max date and no date before 1900 is allowed
- **datepicker**: enhance datepicker accessibility
- **datepicker**: datepicker manual entry [skip-cd] (#211)
- **datepicker**: target menu to input
- **datepicker**: add manual entry functionality and validation to datepicker

### Fix

- **datepicker**: date range validation
- **datepicker**: date range validation for year before 1900
- **datepicker**: fix focused element switch to calendar date when pressing previous/next button
- *****: remove default props [skip-cd] (#214)
- *****: remove default props for Tabs and OverlayTrigger
- *****: remove default props
- **badge**: storybook args table name [skip-cd] (#215)
- **badge**: storybook args table name

## v2.3.0 (2024-01-10)

- previously, users construct their own <thead> and <td> to fill the table.
Now, we define the table structure within the <Table> component.
Users can now fill in the table through props `tableHeaders` and `tableData`.

### Feat

- **table**: expose Table sub-components
- **table**: add removableSort prop
- **table**: add ability to sort table
- **table**: define default table structure

### Fix

- *****: add exports of subcomponents
- **combobox**: dropdown item as a button
- **feature_request**: fix typo:

### Refactor

- *****: move unique generation of id to useEffect hook

## v2.2.2 (2023-09-19)

### Feat

- **stepper**: add keyboard interactions and aria-disabled to markers
- **stepper**: add aria-current attribute to indicate current step
- **stepper**: add tabindex to stepper button
- **quantitytoggle**: update aria-label to include number of steps
- **quantitytoggle**: add announcer to announce increment/decrement
- **datepicker**: add aria-label to 'clear' button
- **datepicker**: add aria attributes
- **datepicker**: add role, aria-haspopup, aria-controls, aria-modal
- **tooltip**: add aria-describedby attribute
- **paginationbase**: add <nav> as outer container
- **navbartoggle**: add aria-expanded attribute
- **navlink**: add aria-current attribute to active link
- **sidenavbutton**: add aria-haspopup attribute
- **DropdownToggle**: add aria-haspopup attribute

### Fix

- **fileupload**: remove proptype filelist triggering typescript error
- **quantitytoggle**: change aria-label to proper english words
- **sidenavlink**: set 'active' attribute of navlink in sidenavlink

### Refactor

- **datepicker**: remove unused else block
- **datepicker, calendar**: remove redundant states, change prop `selectedDate` type

## v2.2.1 (2023-08-01)

### Refactor

- **FileUpload**: deprecate empty object type for selectedFile

## v2.2.0 (2023-06-01)

### Feat

- **fileupload**: add props to support button styling and input file accept attribute

## v2.1.1 (2023-05-02)

### Fix

- **test**: remove unused variable causing failing actions
- **fileupload**: preventdefault on click of cancelicon

## v2.1.0 (2023-05-02)

### Feat

- **combobox**: added a11y attributes
- **fileupload**: add multiple props to allow single or multiple selection of files

### Fix

- **safeFindDomNode**: typescript errors affecting build

### Refactor

- **file upload component**: make the component keyboard and screen reader accessible

## v2.0.0 (2022-07-29)

### Feat

- **formcontrolgroup**: Add new component and modify all components related to icon in form-control

### Fix

- **tooltip**: typescript error no children
- **FormControlToggle**: use controlId instead of dropdown id
- **cards**: update cards html and fix cards is-active classname appearance

### Refactor

- **accessibility**: remove href on buttons and adding href for <a>

## v2.0.0-alpha.1 (2022-06-23)

### Feat

- **footer**: wip add footer components
- **fileupload**: customisable icons. update sb and ut
- **www**: add datepicker, modal, progressbar, typeahead
- WIP add components for static dumping

### Fix

- **inputgroup**: add dropdown caret for splitbutton and update classname for inputgroup
- **modal**: Modaltitle element to be h3 by default
- **Tabs**: typescript error for Tab
- **navbar**: navbar looking like tabs in CRA app. Soln needs to be exported together with nav to obtain current context
- remove extra comma
- vulnerable react-scripts by overriding its dep https://github.com/facebook/create-react-app/issues/12132
- handle dropdown in navbar when expand is  boolean type

### Refactor

- **www**: update import dep to sgds-govtech-react for latest components

## v0.2.7 (2021-04-13)

## v0.2.6 (2021-04-12)

## v0.2.5 (2020-11-23)

## v0.2.4 (2020-10-03)

## v0.2.3 (2020-10-01)

## v0.2.2 (2020-09-29)

## v0.2.1 (2020-09-25)

## v0.2.0 (2020-09-24)

## v0.1.12 (2020-09-19)

## v0.1.11 (2020-02-24)

## v0.1.10 (2020-02-13)

## v0.1.1 (2019-08-01)
