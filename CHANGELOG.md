## 0.0.4
Break changes: rename `*DisplayStrategy` to `*FeedbackStrategy`.

## 0.0.3

Add validation display strategy.

Break changes:
1. rename `NgxFormValidatorConfig` -> `NgxValidatorConfig`;
1. rename `NgxFormValidatorGlobalConfig` -> `NgxValidatorGlobalConfig`;
1. remove `NgxValidatorConfig` config 's `showError` and `removeError` options, add `validationDisplayStrategy` option replace it, support bootstrap strategy and noop strategy, default is bootstrap, you can add your own strategy through implement `IValidationDisplayStrategy`.

## 0.0.2
1. 初始化 `NgxValidatorModule` 模块；
1. 添加 `ngx-form-validator`（`ngxFormValidator`） 指令，主要在 ngForm 上追加一些验证相关的行为；
1. 添加 `ngxFormSubmit` 提交表单，验证通过后会回调相关事件。
