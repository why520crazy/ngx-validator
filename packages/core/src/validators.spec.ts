import { FormControl, ValidationErrors } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { NgxValidators } from './validators';

describe('NgxValidators', () => {
    describe('ngxUniqueCheck', () => {
        let ngxUniqueCheck;

        const uniqueCheck = value => {
            return value === 'unique' ? of(false) : of(true);
        };

        const handleUniqueCheck = (payload: Observable<ValidationErrors | null>) => {
            let errorMap;
            payload.subscribe(data => {
                errorMap = data;
            });
            return errorMap;
        };

        beforeEach(() => {
            ngxUniqueCheck = NgxValidators.uniqueCheckValidator(uniqueCheck);
        });

        it('should error on an empty string', () => {
            expect(handleUniqueCheck(ngxUniqueCheck(new FormControl('')))).toEqual(null);
        });

        it('should error on null', () => {
            expect(handleUniqueCheck(ngxUniqueCheck(new FormControl(null)))).toEqual(null);
        });

        it('should not error on undefined', () => {
            expect(handleUniqueCheck(ngxUniqueCheck(new FormControl(undefined)))).toEqual(null);
        });

        it('should valid on unique value', () => {
            expect(handleUniqueCheck(ngxUniqueCheck(new FormControl('unique')))).toEqual(null);
        });

        it('should invalid on a repeat value', () => {
            expect(handleUniqueCheck(ngxUniqueCheck(new FormControl('repeat'))).ngxUniqueCheck).toEqual({ value: true });
        });
    });
});
