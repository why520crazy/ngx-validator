# ngx-validator [![Build Status](https://api.travis-ci.org/why520crazy/ngx-validator.svg?branch=master)](https://travis-ci.org/why520crazy/ngx-validator)
An Angular7+ form validator library
>handle validation messages easy and automatic, don't need to manually write error tips templates, just configure validation rules, and support extensive custom feedback strategy.

## Demo
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
        }
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
```



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

