## 0.0.4
### Bug Fixes
- fix maxlength and minlength display incorrect error messages

### Break changes: 
- rename `*DisplayStrategy` to `*FeedbackStrategy`

## 0.0.3

- add validation display strategy.

Breaking Changes:
- rename `NgxFormValidatorConfig` -> `NgxValidatorConfig`
- rename `NgxFormValidatorGlobalConfig` -> `NgxValidatorGlobalConfig`
- remove `NgxValidatorConfig` config 's `showError` and `removeError` options, add `validationDisplayStrategy` option replace it, support bootstrap strategy and noop strategy, default is bootstrap, you can add your own strategy through implement `IValidationDisplayStrategy`

## 0.0.2
### Features
- initialize `NgxValidatorModule` module
- add `ngx-form-validator`（`ngxFormValidator`）directive, extend some validation behaviors for ngForm
- add `ngxFormSubmit` directive to submit form cooperate with `ngxFormValidator`
