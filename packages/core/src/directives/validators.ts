// import { Directive, forwardRef, Attribute, Injectable, ElementRef, Input } from '@angular/core';
// import { NG_VALIDATORS, Validator, AbstractControl, FormControl, Validators, ValidatorFn } from '@angular/forms';

// @Directive({
//     selector: '[ngx-min][formControlName],[ngx-min][formControl],[ngx-min][ngModel],',
//     providers: [
//         {
//             provide: NG_VALIDATORS,
//             useExisting: forwardRef(() => MinValidatorDirective),
//             multi: true
//         }
//     ]
// })
// export class MinValidatorDirective implements Validator {
//     private validator: ValidatorFn;

//     @Input() public set min(value: string) {
//         this.validator = Validators.min(parseInt(value, 10));
//     }

//     constructor() {}

//     validate(control: AbstractControl) {
//         return this.validator(control);
//     }
// }

// @Directive({
//     selector: 'input[type=number][max][formControlName],input[type=number][max][formControl],input[type=number][max][ngModel]',
//     providers: [
//         {
//             provide: NG_VALIDATORS,
//             useExisting: forwardRef(() => MaxValidatorDirective),
//             multi: true
//         }
//     ]
// })
// export class MaxValidatorDirective implements Validator {
//     private validator: ValidatorFn;

//     @Input() public set max(value: string) {
//         this.validator = Validators.max(parseInt(value, 10));
//     }

//     constructor() {}

//     validate(control: AbstractControl) {
//         return this.validator(control);
//     }
// }
