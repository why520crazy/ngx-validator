# ngx-validator

[![Coverage Status][coveralls-image]][coveralls-url]
[![Build Status][build-status]](https://travis-ci.org/why520crazy/ngx-validator)
[![npm version](https://badge.fury.io/js/%40why520crazy%2Fngx-validator.svg)](https://www.npmjs.com/@why520crazy/ngx-validator)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@why520crazy/ngx-validator)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)

[coveralls-image]: https://coveralls.io/repos/github/why520crazy/ngx-validator/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/why520crazy/ngx-validator
[build-status]: https://api.travis-ci.org/why520crazy/ngx-validator.svg?branch=master

An Angular 7+ form validator library, may be the best angular validator library in the world.

> handle validation messages easy and automatic, don't need to manually write error tips templates, just configure validation rules, and support extensive custom feedback strategy.

## Demo

![ngx-validator-live-demo.gif](https://github.com/why520crazy/ngx-validator/blob/master/packages/integration/src/assets/images/ngx-validator-live-demo.gif?raw=true)

[Live Demo](https://why520crazy.github.io/ngx-validator/index.html)

[Use Case](https://worktile.com/signup?utm_source=w5c-ngx-validator)

## Installation

```
npm install @why520crazy/ngx-validator --save
# or
yarn add @why520crazy/ngx-validator
```

## Usage

#### Loading the module in the app module

```
import { NgxValidatorModule, ValidationFeedbackStrategyBuilder } from '@why520crazy/ngx-validator';

@NgModule({
  imports: [
    CommonModule,
    NgxValidatorModule.forRoot({
        validationFeedbackStrategy: ValidationFeedbackStrategyBuilder.bootstrap(), // default is bootstrap 4 style
        validationMessages: {
            username: {
                required: 'Username is required.',
                pattern: 'Incorrect username format.'
            }
        },
        validateOn: 'submit' | 'blur' // default is submit
    })
  ]
})
class AppModule {}
```

#### Add directives to form elements

add `ngxFormValidator` directive to form element and add `ngxFormSubmit` directive to submit button.

```
 <form name="exampleForm" novalidate [ngxFormValidator]="validatorConfig">
   <div class="form-group">
       <label for="email1">Email address</label>
        <input type="email" email class="form-control" name="email" id="email1"
                [(ngModel)]="model.email" required placeholder="Enter email" />
    </div>
    <button type="button" (ngxFormSubmit)="submit()" class="btn btn-primary">Submit</button>
 <form>

validatorConfig: NgxValidatorConfig = {
    validationMessages: {
        username: {
            required: '用户名不能为空',
            pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能为数字，必须是2-20个字符',
            ngxUniqueCheck: '输入的用户名已经存在，请重新输入'
        }
    },
    validateOn: 'blur' | 'submit'
};
```

## APIs

#### ngxFormValidator configuration

| Name                       | Type                                                           | Description                                                                                                 |
| -------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| validationMessages         | {[controlName: string]: {[validatorErrorKey: string]: string}} | validation rules                                                                                            |
| validationFeedbackStrategy | ValidationFeedbackStrategy                                     | validation feedback strategy which contains error show and hide, it will be global configuration if not set |
| validateOn                 | 'submit' \| 'blur'                                             | it will be global configuration's validateOn if not set                                                     |

```
validatorConfig: NgxValidatorConfig = {
    validationMessages: {
        username: {
            required: 'Username required',
            pattern: 'Username format is incorrect, it consists of letters, numbers and underscores, the first letter cannot be a number. It must be 2-20 characters.',
            ngxUniqueCheck: 'The username entered already exists.'
        }
    },
    validateOn: 'submit'
};
```

#### Global configuration

Global configuration can be set by `NgxValidatorModule.forRoot(config)`, or by injecting `NgxValidatorLoader` service at runtime.

| Name                       | Type                                                           | Description                                                     |
| -------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| validationMessages         | {[controlName: string]: {[validatorErrorKey: string]: string}} | validation Rules                                                |
| validationFeedbackStrategy | ValidationFeedbackStrategy                                     | validation feedback strategy which contains error show and hide |
| globalValidationMessages   | {[validatorErrorKey: string]: string}                          | validator default validation rules                              |
| validateOn                 | 'submit' \| 'blur'                                             | validate trigger                                                |

`globalValidationMessages` 默认规则如下，当某个表单元素比如 `username` 在表单和全局的 `validationMessages` 都没有被设置，验证不通过会直接显示 `globalValidationMessages 中的 required` 提示信息

```
{
    required: '该选项不能为空',
    maxlength: '该选项输入值长度不能大于{requiredLength}',
    minlength: '该选项输入值长度不能小于{requiredLength}',
    ngxUniqueCheck: '输入值已经存在，请重新输入',
    email: '输入邮件的格式不正确',
    repeat: '两次输入不一致',
    pattern: '该选项输入格式不正确',
    number: '必须输入数字',
    url: '输入URL格式不正确',
    max: '该选项输入值不能大于{max}',
    min: '该选项输入值不能小于{min}'
};
```

#### 扩展方法

1. 单独验证某一个表单元素, 获取到 `NgxFormValidatorDirective` 实例 `ngxFormValidator: NgxFormValidatorDirective`，通过调用 `ngxFormValidator.validator.validateControl(name: string)` 方法单独验证；
1. 根据服务端返回的错误，设置某个表单元素错误提示信息，调用 `ngxFormValidator.validator.markControlAsError(name: string, errorMessage: string)`

#### 自定义反馈策略

如果你的项目不是使用 bootstrap4，而是其他 UI 库，那么可以通过扩展自己的错误反馈策略，然后在全局设置中配置一次后所有的表单验证都会使用配置之后的策略，以下是一个自定义反馈策略的示例：

```
const CUSTOM_INVALID_CLASS = 'custom-invalid';
const CUSTOM_INVALID_FEEDBACK_CLASS = 'custom-invalid-feedback';

export class CustomValidationFeedbackStrategy implements ValidationFeedbackStrategy {
    showError(element: HTMLElement, errorMessages: string[]): void {
        element.classList.add(CUSTOM_INVALID_CLASS);
        // add element show error message
    }

    removeError(element: HTMLElement): void {
        element.classList.remove(CUSTOM_INVALID_CLASS);
       // remove element error message
    }
}
```

## Documents

[如何优雅的使用 Angular 表单验证](https://zhuanlan.zhihu.com/p/51467181)

[Angular 表单验证类库 ngx-validator 1.0 正式发布](https://github.com/why520crazy/ngx-validator/blob/master/1.0.0-publish.md)

## Development

```
$ git clone git@github.com:why520crazy/ngx-validator.git
$ cd ngx-validator
$ npm install
$ npm run start
$ npm run test
```

## Building & Publish

```
$ npm run build
$ npm run pub
```

## Links

[Angular.io](https://angular.io)

[Angular.cn](https://angular.cn)

[Worktile.com](https://worktile.com?utm_source=w5c-ngx-validator)

## License

[MIT License](https://github.com/why520crazy/ngx-validator/blob/master/LICENSE)

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://www.zhihu.com/people/why520crazy/activities"><img src="https://avatars2.githubusercontent.com/u/3959960?v=4" width="100px;" alt="why520crazy"/><br /><sub><b>why520crazy</b></sub></a><br /><a href="#question-why520crazy" title="Answering Questions">💬</a></td><td align="center"><a href="https://github.com/luxiaobei"><img src="https://avatars1.githubusercontent.com/u/13583957?v=4" width="100px;" alt="luxiaobei"/><br /><sub><b>luxiaobei</b></sub></a><br /><a href="https://github.com/why520carzy/@why520crazy/ngx-validator/commits?author=luxiaobei" title="Code">💻</a></td><td align="center"><a href="https://github.com/walkerkay"><img src="https://avatars1.githubusercontent.com/u/15701592?v=4" width="100px;" alt="Walker"/><br /><sub><b>Walker</b></sub></a><br /><a href="#design-walkerkay" title="Design">🎨</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
