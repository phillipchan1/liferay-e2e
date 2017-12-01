# liferay-e2e

> End-to-End tests for Liferay.com

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

## Linting & Formatting

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
