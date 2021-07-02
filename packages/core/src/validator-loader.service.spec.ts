import { TestBed } from '@angular/core/testing';

import { NgxValidatorLoader } from './validator-loader.service';
import { BootstrapValidationFeedbackStrategy } from './strategies';
import { DEFAULT_GLOBAL_VALIDATION_MESSAGES } from './validator.class';

describe('NgxValidatorLoader', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [NgxValidatorLoader]
        })
    );

    it('should be created NgxValidatorLoader service', () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        expect(service).toBeTruthy();
        expect(service).not.toBeNull();
        expect(service).toBeDefined();
    });

    it(`should get empty validation messages`, () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        expect(service.validationMessages).toEqual({});
    });

    it(`should get bootstrap validation feedback strategy`, () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        expect(service.validationFeedbackStrategy instanceof BootstrapValidationFeedbackStrategy).toBe(true);
    });

    it(`should get default global message when formControl's message is not specified`, () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        ['required', 'email'].forEach(validatorName => {
            expect(service.getErrorMessage(`not_exist_form_control_name`, validatorName)).toBe(
                DEFAULT_GLOBAL_VALIDATION_MESSAGES[validatorName]
            );
        });
    });

    it(`should get configured global message when formControl's message is not specified`, () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        const globalValidationMessages = {
            required: 'this is configured required message'
        };
        service.setGlobalValidationMessages(globalValidationMessages);
        expect(service.getErrorMessage(`not_exist_form_control_name`, 'required')).toBe(
            globalValidationMessages.required
        );
    });

    it(`should get formControl's configured message`, () => {
        const service: NgxValidatorLoader = TestBed.inject(NgxValidatorLoader);
        const validationMessages = {
            username: {
                required: `this is username configured required message`
            }
        };
        service.addValidationMessages(validationMessages);
        expect(service.getErrorMessage(`username`, 'required')).toBe(validationMessages.username.required);
        expect(service.getErrorMessage(`username`, 'email')).toBe(DEFAULT_GLOBAL_VALIDATION_MESSAGES.email);
    });
});
