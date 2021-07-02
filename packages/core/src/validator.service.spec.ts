import { TestBed } from '@angular/core/testing';

import { NgxFormValidatorService } from './validator.service';

describe('NgxFormValidatorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [NgxFormValidatorService]
        })
    );

    it('should be created', () => {
        const service: NgxFormValidatorService = TestBed.inject(NgxFormValidatorService);
        expect(service).toBeTruthy();
    });
});
