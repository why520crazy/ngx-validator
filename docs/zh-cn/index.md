---
title: 介绍
order: 10
---
一个 Angular 7+ 的表单验证类库，可能是世界上最好用的 Angular 表单验证类库
> 自动处理验证消息，不需要手动写错误提示的模板，只需要配置验证规则即可，同时支持扩展自定义验证策略。

## 安装

```
npm install @why520crazy/ngx-validator --save
# or
yarn add @why520crazy/ngx-validator
```

## 快速开始


### 导入 NgxValidatorModule   
在主模块或者任何特性模块中导入 NgxValidatorModule 模块
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

### 在表单上添加指令

在表单元素上添加 `ngxFormValidator` 指令并在提交按钮上添加 `ngxFormSubmit` 指令处理提交事件。

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

## 全局配置
全局配置通过导入模块配置`NgxValidatorModule.forRoot(config)`，或者在运行时通过注入`NgxValidatorLoader`进行配置。

| 名称 | 类型 | 描述 |
| ------------ | ------------------- | --------------- |
| validationMessages     | {[controlName: string]: {[validatorErrorKey: string]: string}} | 验证规则 |
| validationFeedbackStrategy | ValidationFeedbackStrategy | 验证反馈策略，主要控制错误展示和隐藏的逻辑 |
| globalValidationMessages   | {[validatorErrorKey: string]: string} | 全局的默认展验证规则  |
| validateOn  | 'submit' \| 'blur'  | 验证触发条件 |

<br >

默认的全局验证规则 `globalValidationMessages` 如下

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

表单上配置的 `validationMessages` 优先级大于全局配置。
当某个元素在表单配置中没有找到，同时全局配置也没有找到，它将会使用全局默认的验证消息。

## 扩展

通过模板变量或者`ViewChild`获取到表单验证组件`ngxFormValidator`

1. 单独验证某个控件：`formValidator.validator.validateControl(name: string)`
2. 为某个控件展示服务端返回的错误提示：`formValidator.validator.markControlAsError(name: string, errorMessage: string)` 


## 自定义反馈规则

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
