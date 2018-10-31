# Batch Images Download - Chrome Extension

## Todo

- [ ] New tab to show images
  - [x] New tab
  - [ ] Load image and show on new tab
    - [x] Extract images
    - [x] show on new tab
    - [ ] After select images directly show on new tab
  - [ ] If there is one open tab, just update instead of opening a new one.
  - [ ] Provide batch download button
    - [x] Support user to select images to download
  - [ ] Support user to remove images
- [ ] Use button in popup to control work flow
  - [x] Design and implement popup window
  - [ ] MODE_ONE: select begin and end
    - [x] Get all images in the selected scope
    - [ ] Highlighten the image in selected scope
  - [ ] MODE_TWO: selct picture one by one
- [ ] Add shortcut for triggering extension.
- [x] Webpack issue
  - [x] Add base config and use webpack merge
  - [x] Add webpack alias

## Installation

```bash
# clone it
$ git clone git@github.com:RogerZZZZZ/batch-img-download.git

# Install dependencies
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ npm run dev
```
* If you're developing Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injected GitHub (https) pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This boilerplate uses `Webpack` and `react-transform`, and use `Redux`. You can hot reload by editing related files of Popup & Window & Inject page.

#### Using Redux DevTools Extension

You can use [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) on development mode.

## Build

```bash
# build files to './build'
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ npm run build
$ npm run compress -- [options]
```

#### Options

If you want to build `crx` file (auto update), please provide options, and add `update.xml` file url in [manifest.json](https://developer.chrome.com/extensions/autoupdate#update_url manifest.json).

* --app-id: your extension id (can be get it when you first release extension)
* --key: your private key path (default: './key.pem')  
  you can use `npm run compress-keygen` to generate private key `./key.pem`
* --codebase: your `crx` file url

See [autoupdate guide](https://developer.chrome.com/extensions/autoupdate) for more information.

## Test

* `test/app`: React components, Redux actions & reducers tests
* `test/e2e`: E2E tests (use [chromedriver](https://www.npmjs.com/package/chromedriver), [selenium-webdriver](https://www.npmjs.com/package/selenium-webdriver))

```bash
# lint
$ npm run lint
# test/app
$ npm test
$ npm test -- --watch  # watch files
# test/e2e
$ npm run build
$ npm run test-e2e
```

## LICENSE

[MIT](LICENSE)
