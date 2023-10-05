# Cypress e2e testing

## Usage
This folder consists of test scripts to run e2e testing on several apps using Cypress.

Running of each app is done by their respective `scripts/run_*.sh`. Refer to each `run_*.sh` script for more details such as which port the app is running in, app version etc.

Running of all apps is done by `scripts/run_all.js`.

To start e2e testing (i.e. run `e2e/apps.spec.cy.ts`), cd to root directory and run

```
npm run e2e-test
```

Cypress Launchpad will open after some time. Navigate to `e2e testing` -> `Choose a browser` -> Under `Specs` tab, click on `apps.spec.cy.ts` file. Wait for all tests to run.

**Note: your tests might fail on the first few runs because the app servers might not have completed starting. Just wait for some time for the servers to finish starting. Look out for console errors in the terminal as well.** 

## Dev Guide
To start testing a particular app, do the following:
1. `npm install` the app in `cypress/apps` folder.
1. In the root directory, ensure that the `dist` folder containing build files is present. Otherwise, run `npm run build` in the root directory.
1. Install the following modules in the app folder:
    - `npm install @govtechsg/sgds`
    - `npm install file:../../../dist` to install the local sgds-react library
1. Create a `scripts/run_*.sh` file for the app. You can refer to the other `run_*.sh` files for more details on create the script to run your app. **Important: Ensure that the port your app is running on is not being used by other apps.**
1. Update `scripts/run_all.js` to add the script for running your app.
1. Update `e2e/apps.spec.cy.ts` to add test for visiting your app's server.
