# Development Guide

This documents development of the sgds-govtech-react 

## Writing 
### File Structure

1) When generating new Components, generate a new folder with Component name and include `index.ts` file as entry point.
This helps to ensure rollup exports of individual components are properly configured with the appropriate name and file

e.g. > Accordion 
        -> index.ts

2) Any helper functions that is not to be exported as part of library can go under `utils` folder

### Test

1) Unit test should be written in `tests` folder at root 

## Publishing 

When the library is ready for publication , run the following steps 

1) ```npm run build```
    ** /dist folder is genrated
2) From root run ```npm publish ./dist ``` 
or 
navigate to /dist folder and run ```npm publish```

## Run Storybook 

To start storybook hit `npm run storybook` on terminal