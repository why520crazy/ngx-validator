# ngx-validator
Angular7+ form validator
>make error tips easy and automatic. don't need to manually write error tips templates.

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
import { NgxValidatorModule } from '@why520crazy/ngx-validator';

@NgModule({
  imports: [
    CommonModule,
    NgxValidatorModule.forRoot({
        showElementError: boolean | ((element: HTMLElement, errorMessages: string[]) => void),
        removeElementError: boolean | ((element: HTMLElement, errorMessages: string[]) => void),
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
add `ngx-form-validator` directive to form element and add `ngxFormSubmit` directive to submit button.

```
 <form name="exampleForm" novalidate ngx-form-validator [ngxFormValidatorConfig]="validatorConfig">
   <div class="form-group">
       <label for="email1">Email address</label>
        <input type="email" class="form-control" name="email" id="email1"
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
```

## Building & Publish
```
$ npm run build
$ npm run publish
```

## Links

[Angular.io](https://angular.io)

[Angular.cn](https://angular.cn)

## License

[MIT License](https://github.com/why520crazy/ngx-validator/blob/master/LICENSE)

