# Contributing Guide
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Thank you so much for contributing to @govtechsg/sgds-react. Please read this guideline before starting your development works. 

## Contributing workflow 

To contribute, please start off at the Issue section of our github repository. 

1) Checkout our Issue section to search for similar bugs/issues/feature request that you encounter. Someone else might have already raised a similar issue.
2) If your issue is not found, open an issue !
3) Follow the instructions of the issue request form and answer them 
4) Describe your bug / new feature request as detailed as possible. For new feature request, let us know your motivation behind your proposal and how you intend to build the feature. For bug fixes, let us know how you intend to fix the bug. 
5) An SGDS admin will pick up on the discussion and notify you if the proposal is accepted 
6) Once accepted, you can fork the repository and start working away !
7) Raise a PR, tagging the issue number, and request a review from one of our admins. 

## Writing 

### Setup

1) git clone this repository 
2) run `npm run install`
2) To start storybook, hit `npm run storybook` on terminal

### File Structure

1) When generating new Components, create a new folder with Component name and include `index.ts` file as entry point.
This helps to ensure rollup exports of individual components are properly configured with the appropriate name and file

    e.g. > Accordion 
            -> index.ts

2) Any helper functions that is not to be exported as part of library can go under `utils` folder

### Test

1) Unit test should be written in `tests` folder at root 
2) It is compulsory to write unit test for changes made or new components build 

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