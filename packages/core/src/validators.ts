import { AbstractControl, ValidationErrors } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class NgxValidators {
    static uniqueCheckValidator(uniqueCheckFn: (value: any) => Observable<boolean>) {
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
}
