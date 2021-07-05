import { AbstractControl, ValidationErrors } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class NgxValidators {
    static uniqueCheckValidator(
        uniqueCheckFn: (value: string) => Observable<boolean>
    ): (control: AbstractControl) => Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        const result = (
            control: AbstractControl
        ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
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
        return result;
    }
}
