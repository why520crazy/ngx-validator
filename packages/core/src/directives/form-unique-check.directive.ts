import { Directive, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

function uniqueCheckValidator(uniqueCheckFn: Function) {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        if (control.value) {
            return uniqueCheckFn(control.value).pipe(
                map(isUnique => {
                    return isUnique ? { ngxUniqueCheck: { value: true } } : null;
                })
            );
        } else {
            return of(null);
        }
    };
}

@Directive({
    selector: '[ngxUniqueCheck]',
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
        return uniqueCheckValidator(this.ngxUniqueCheck)(control);
    }
}
