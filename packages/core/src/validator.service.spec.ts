import { TestBed } from '@angular/core/testing';
import { NgxValidatorLoader } from './validator-loader.service';

import { NgxFormValidatorService } from './validator.service';

describe('NgxFormValidatorService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [NgxFormValidatorService, NgxValidatorLoader]
        })
    );

    it('should be created', () => {
        const service: NgxFormValidatorService = TestBed.inject(NgxFormValidatorService);
        expect(service).toBeTruthy();
    });
});
