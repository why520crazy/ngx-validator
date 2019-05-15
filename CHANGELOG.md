# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
-   fix error beacuse renamee ValidationFeedbackStrategy ([906a735](https://github.com/why520crazy/ngx-validator/commit/906a735))

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
