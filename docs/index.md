---
title: Intro
order: 10
---

An Angular 7+ form validator library, may be the best angular validator library in the world.

> handle validation messages easy and automatic, don't need to manually write error tips templates, just configure validation rules, and support extensive custom feedback strategy.

## Installation

```
npm install @why520crazy/ngx-validator --save
# or
yarn add @why520crazy/ngx-validator
```

## Getting Started


### import NgxValidatorModule   
Loading the module in the any module (AppModule or Feature module).

```ts
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

### Add directives to form elements

add `ngxFormValidator` directive to form element and add `ngxFormSubmit` directive handle submit event.

```html
 <form name="exampleForm" novalidate [ngxFormValidator]="validatorConfig">
   <div class="form-group">
       <label for="email1">Email address</label>
        <input type="email" email class="form-control" name="email" id="email1"
                [(ngModel)]="model.email" required placeholder="Enter email" />
    </div>
    <button type="button" (ngxFormSubmit)="submit()" class="btn btn-primary">Submit</button>
 <form>
```

```ts
// .ts
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

submit() {
    // handle submit event
}
```

## Global configuration

Global configuration can be set by `NgxValidatorModule.forRoot(config)`, or by injecting `NgxValidatorLoader` service at runtime.

| Name | Type | Description |
| ------------ | ------------------- | --------------- |
| validationMessages     | {[controlName: string]: {[validatorErrorKey: string]: string}} | validation Rules |
| validationFeedbackStrategy | ValidationFeedbackStrategy | validation feedback strategy which contains error show and hide |
| globalValidationMessages   | {[validatorErrorKey: string]: string} | validator default validation rules  |
| validateOn  | 'submit' \| 'blur'  | validate trigger |

<br >

Default `globalValidationMessages` rules as below:

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

The priority of ngx-form's `validationMessages` config is greater than `validationMessages`,
it will use `globalValidationMessages` when an element doesn't match form config `validationMessages` or global config validationMessages

## Extensions

Get `formValidator` directive by `<form #formValidator="ngxFormValidator">` or `ViewChild`

1. `formValidator.validator.validateControl(name: string)` validate an control individually
2. `formValidator.validator.markControlAsError(name: string, errorMessage: string)` show error by server's error code for an control


## Custom Feedback Strategy

```ts
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

NgxValidatorModule.forRoot({
    ...
    validationFeedbackStrategy: new CustomValidationFeedbackStrategy(),
    ...
})
```
