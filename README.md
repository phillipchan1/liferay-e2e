# liferay-e2e

> End-to-End tests for Liferay.com

* [Running Cypress Tests](#running-cypress-tests)
* [Linting &amp; Formatting](#linting-and-formatting)
* [es6](#es6-features)
* [Api Keys](#api-keys)

## Running Cypress Tests

* Install **node dependecies** by running

```shell
npm install
```

* To open the local **live test runner dashboard** run:

```shell
npm run open
```

* To run tests in your **console** run:

```shell
npm run open
```

## Linting and Formatting

* To apply **general auto formatting for all files**, please install the `editorconfig` plugin for your text editor

* If you would like your **JS code to be formatted on save**, make sure to set your editor to format on save and install `prettier` and `eslint` plugins for your editor
	* Example for editor settings in VS Code plugin

```json
// Set the default
"editor.formatOnSave": false,
// Enable per-language
"[javascript]": {
    "editor.formatOnSave": true
}
```

* Otherwise your code will be linted + auto fixed **when you make a commit**
	* It will usually correct all code formatting, but if it fails, you will have to fix those errors before you can successfully commit

## es6 Features

* You can use es6 in the `cypress folder` as it uses a babel plugin by default to transpile es6 into es5 code
* In `the server folder`, you can also use most es6 features besides `import package from 'package'` if you have a **node version > 6.11.4**

## Api Keys

* We are using `Cypress.env()` to keep api keys safe using a `cypress.env.json` file in the root dir
	* You will need to add your own `cypress.env.json` which has the following shape:

```
HUBSPOT_API_KEY=3423-234234...
HUBSPOT_PORTAL_ID=465...
```
