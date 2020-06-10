# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.1.0](https://github.com/why520crazy/ngx-validator/compare/v1.0.0...v1.1.0) (2020-06-10)

### Build System

-   upgrade to 1.0.0 ([369c11a](https://github.com/why520crazy/ngx-validator/commit/369c11a))
-   **deps:** bump acorn from 6.1.1 to 6.4.1 ([6645a28](https://github.com/why520crazy/ngx-validator/commit/6645a28))
-   **deps:** bump fstream from 1.0.11 to 1.0.12 ([79b149b](https://github.com/why520crazy/ngx-validator/commit/79b149b))
-   **deps:** bump handlebars from 4.0.12 to 4.1.2 ([4943ab7](https://github.com/why520crazy/ngx-validator/commit/4943ab7))
-   **deps:** bump handlebars from 4.1.2 to 4.5.3 ([#26](https://github.com/why520crazy/ngx-validator/issues/26)) ([44f6616](https://github.com/why520crazy/ngx-validator/commit/44f6616))
-   **deps:** bump https-proxy-agent from 2.2.1 to 2.2.4 ([04ab8e3](https://github.com/why520crazy/ngx-validator/commit/04ab8e3))
-   **deps:** bump js-yaml from 3.12.0 to 3.13.1 ([1842157](https://github.com/why520crazy/ngx-validator/commit/1842157))
-   **deps:** bump mixin-deep from 1.3.1 to 1.3.2 ([cffb2ef](https://github.com/why520crazy/ngx-validator/commit/cffb2ef))
-   **deps:** bump tar from 2.2.1 to 2.2.2 ([0479d18](https://github.com/why520crazy/ngx-validator/commit/0479d18))
-   **deps:** bump websocket-extensions from 0.1.3 to 0.1.4 ([23e7b17](https://github.com/why520crazy/ngx-validator/commit/23e7b17))

### Features

-   upgrade angular to v9.x ([#29](https://github.com/why520crazy/ngx-validator/issues/29)) ([#31](https://github.com/why520crazy/ngx-validator/issues/31)) ([0fee817](https://github.com/why520crazy/ngx-validator/commit/0fee817))
-   validateOn add type change [#8](https://github.com/why520crazy/ngx-validator/issues/8) ([#11](https://github.com/why520crazy/ngx-validator/issues/11)) ([032c541](https://github.com/why520crazy/ngx-validator/commit/032c541))

### Tests

-   **ci:** add ChromeHeadlessCI for travis ci ([bebf636](https://github.com/why520crazy/ngx-validator/commit/bebf636))
-   add report-coverage and badge in README ([28b0150](https://github.com/why520crazy/ngx-validator/commit/28b0150))
-   add test cases for set global config and add to demo [#10](https://github.com/why520crazy/ngx-validator/issues/10) ([b420ba5](https://github.com/why520crazy/ngx-validator/commit/b420ba5))
-   change ci to circleci ([6b3d977](https://github.com/why520crazy/ngx-validator/commit/6b3d977))

## [1.0.0](https://github.com/why520crazy/ngx-validator/compare/v0.0.5...v1.0.0) (2019-05-16)

### Build System

-   fix build error arrow lambda not supported in static function ([e4c5e66](https://github.com/why520crazy/ngx-validator/commit/e4c5e66))
-   fix pub-only 0.0.5 ([a9541dc](https://github.com/why520crazy/ngx-validator/commit/a9541dc))

### 0.0.5 (2019-05-15)

### Bug Fixes

-   Maximum call stack size exceeded ([af239fe](https://github.com/why520crazy/ngx-validator/commit/af239fe))

### Features

-   validateOn blur ([1bec347](https://github.com/why520crazy/ngx-validator/commit/1bec347))

### Tests

-   add code coverage ([8d7e084](https://github.com/why520crazy/ngx-validator/commit/8d7e084))
-   add node 10 in travis.yml ([f01112b](https://github.com/why520crazy/ngx-validator/commit/f01112b))
-   add test for validator directive ([d9e84ef](https://github.com/why520crazy/ngx-validator/commit/d9e84ef))
-   add travis.yml file ([c760620](https://github.com/why520crazy/ngx-validator/commit/c760620))
-   add validator loader service some test cases ([6722cce](https://github.com/why520crazy/ngx-validator/commit/6722cce))
-   change node version 8.11.3 ([9c031e3](https://github.com/why520crazy/ngx-validator/commit/9c031e3))
-   change travis.yml config ([8fa1d0c](https://github.com/why520crazy/ngx-validator/commit/8fa1d0c))
-   fix error because rename ValidationFeedbackStrategy ([906a735](https://github.com/why520crazy/ngx-validator/commit/906a735))

## 0.0.4

### Bug Fixes

-   fix maxlength and minlength display incorrect error messages

### Break changes:

-   rename `*DisplayStrategy` to `*FeedbackStrategy`

## 0.0.3

-   add validation display strategy.

Breaking Changes:

-   rename `NgxFormValidatorConfig` -> `NgxValidatorConfig`
-   rename `NgxFormValidatorGlobalConfig` -> `NgxValidatorGlobalConfig`
-   remove `NgxValidatorConfig` config 's `showError` and `removeError` options, add `validationDisplayStrategy` option replace it, support bootstrap strategy and noop strategy, default is bootstrap, you can add your own strategy through implement `IValidationDisplayStrategy`

## 0.0.2

### Features

-   initialize `NgxValidatorModule` module
-   add `ngx-form-validator`（`ngxFormValidator`）directive, extend some validation behaviors for ngForm
-   add `ngxFormSubmit` directive to submit form cooperate with `ngxFormValidator`
