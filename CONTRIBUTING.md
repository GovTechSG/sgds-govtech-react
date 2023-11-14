# Contributing Guide
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds-react. Please read this guideline before starting your development works. 

## Writing 

### Setup

1) git clone this repository 
2) run `npm run install`
2) To start storybook, hit `npm run storybook` on terminal

### File Structure

1) When generating new Components, generate a new folder with Component name and include `index.ts` file as entry point.
This helps to ensure rollup exports of individual components are properly configured with the appropriate name and file

    e.g. > Accordion 
            -> index.ts

2) Any helper functions that is not to be exported as part of library can go under `utils` folder

### Test

1) Unit test should be written in `tests` folder at root 

### Storybook documentation 

#### ArgsTable 

To show props for components and subcomponents in Storybook's ArgsTable, it requires that the component be exported via named exports. 
Its displayName must be the reflect the same name as the named exports as well 

For example, in src code 

```jsx
export const TableHeader = ... 

TableHeader.displayName = "TableHeader"
```
## Commit standard 
This is a commitizen friendly repo. Adhere to the commit conventions of cz. 

## Publishing (for admin only)
Library publication is performed in workflow by github actions. When ready for publishing, perform the following steps

##### Bump version 
1) run ```npm version <major|minor|path> ```
    or for alpha releases
    ``` npm version <version-name> ```
    **version number should observe SEMVER
    **this step will auto-generate a git tag on your local
2) ```git push ``` the changes

##### Generate Changelog 
3) run ```cz changelog``` to update CHANGELOG.md file (ensure that you have set up [cz-cli](https://github.com/commitizen/cz-cli) globally)
**`cz changelog` updates based on your local git tags
4) Push the changes 
    
##### Push git tag
4) run `git tag` to check the newly generated git tag on local
5) ```npm push origin <newly-created-tag> ```
** this triggers gh action workflow to publish the library to npm 
##### Create a release
6) Manually create a release on github 