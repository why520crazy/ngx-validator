import { Directive, forwardRef, Input } from '@angular/core';
import {
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    Validators,
    ValidatorFn,
    NG_ASYNC_VALIDATORS,
    AsyncValidator,
    ValidationErrors
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { NgxValidators } from '../validators';

@Directive({
    selector: '[ngxMin][formControlName],[ngxMin][formControl],[ngxMin][ngModel],',
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
        this.validator = Validators.min(parseFloat(value));
    }

    constructor() {}

    validate(control: AbstractControl) {
        return this.validator(control);
    }
}

@Directive({
    selector: '[ngxMax][formControlName],[ngxMax][formControl],[ngxMax][ngModel]',
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
        this.validator = Validators.max(parseFloat(value));
    }

    constructor() {}

    validate(control: AbstractControl) {
        return this.validator(control);
    }
}

@Directive({
    selector: '[ngxUniqueCheck][formControlName],[ngxUniqueCheck][formControl],[ngxUniqueCheck][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: NgxUniqueCheckDirective,
            multi: true
        }
    ]
})
export class NgxUniqueCheckDirective implements AsyncValidator {
    @Input() ngxUniqueCheck: (value: any) => Observable<boolean | null> = (value: any) => of(null);

    constructor() {}

    validate(control: AbstractControl): Promise<ValidationErrors> | Observable<ValidationErrors> {
        return NgxValidators.uniqueCheckValidator(this.ngxUniqueCheck)(control);
    }
}
