import { Directive, forwardRef, Attribute, Injectable, ElementRef, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, FormControl, Validators, ValidatorFn } from '@angular/forms';

@Directive({
    selector: 'input[type=number][ngxMin][formControlName],input[type=number][ngxMin][formControl],input[type=number][ngxMin][ngModel],',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MinValidatorDirective),
            multi: true
        }
    ]
})
export class MinValidatorDirective implements Validator {
    private validator: ValidatorFn;

    @Input() public set ngxMin(value: string) {
        this.validator = Validators.min(parseInt(value, 10));
    }

    constructor() {}

    validate(control: AbstractControl) {
        return this.validator(control);
    }
}

@Directive({
    selector: 'input[type=number][ngxMax][formControlName],input[type=number][ngxMax][formControl],input[type=number][ngxMax][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MaxValidatorDirective),
            multi: true
        }
    ]
})
export class MaxValidatorDirective implements Validator {
    private validator: ValidatorFn;

    @Input() public set ngxMax(value: string) {
        this.validator = Validators.max(parseInt(value, 10));
    }

    constructor() {}

    validate(control: AbstractControl) {
        return this.validator(control);
    }
}
