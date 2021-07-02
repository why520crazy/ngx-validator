import { TestBed } from '@angular/core/testing';

import { NgxValidatorModule } from './module';
import { NgModule } from '@angular/core';
import { NgxValidatorLoader } from './public-api';
import { ValidationFeedbackStrategyBuilder, NoopValidationFeedbackStrategy } from './strategies';

const GLOBAL_VALIDATION_MESSAGES = {
    required: 'This option cannot be empty',
    maxlength: 'The length of this option input cannot be greater than {requiredLength}',
    minlength: 'The length of this option input cannot be less than {requiredLength}',
    ngxUniqueCheck: 'The input value already exists, please re-enter',
    email: 'The format of the input message is incorrect',
    repeat: 'Inconsistent input twice',
    pattern: 'The option input format is incorrect',
    number: 'Must enter a number',
    url: 'The input URL format is incorrect',
    max: 'The input value of this option cannot be greater than {max}',
    min: 'The input value of this option cannot be less than {min}'
};

const VALIDATION_MESSAGES = {
    username: {
        required: `this is username configured required message`
    }
};

@NgModule({
    imports: [NgxValidatorModule]
})
class AppModuleDirectly {}

@NgModule({
    imports: [
        NgxValidatorModule.forRoot({
            globalValidationMessages: GLOBAL_VALIDATION_MESSAGES,
            validateOn: 'blur',
            validationMessages: VALIDATION_MESSAGES,
            validationFeedbackStrategy: ValidationFeedbackStrategyBuilder.noop()
        })
    ]
})
class AppModuleWithConfig {}

describe('NgxValidatorModule', () => {
    it('should be created directly import module', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleDirectly]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service).toBeTruthy();
    });

    it('should be created import module with default config ', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleWithConfig]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service).toBeTruthy();
    });

    it('should be overwrite default global validation messages ', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleWithConfig]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service['config'].globalValidationMessages).toEqual(GLOBAL_VALIDATION_MESSAGES);
    });

    it('should be overwrite default validation messages', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleWithConfig]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service['config'].validationMessages).toEqual(VALIDATION_MESSAGES);
    });

    it('should be overwrite default validation feedback strategy', () => {
        TestBed.configureTestingModule({
            imports: [AppModuleWithConfig]
        });
        const service: NgxValidatorLoader = TestBed.get(NgxValidatorLoader);
        expect(service['config'].validationFeedbackStrategy instanceof NoopValidationFeedbackStrategy).toEqual(true);
    });
});
