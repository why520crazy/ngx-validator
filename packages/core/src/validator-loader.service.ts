import { Inject, Injectable, Optional } from '@angular/core';
import {
    NgxValidatorGlobalConfig,
    NgxValidationMessages,
    Dictionary,
    NGX_VALIDATOR_CONFIG,
    DEFAULT_GLOBAL_VALIDATION_MESSAGES
} from './validator.class';
import { ValidationErrors } from '@angular/forms';
import { IValidationFeedbackStrategy, ValidationFeedbackStrategyBuilder } from './strategies';

const defaultValidatorConfig: NgxValidatorGlobalConfig = {
    validationFeedbackStrategy: ValidationFeedbackStrategyBuilder.bootstrap(),
    validationMessages: {}
};

@Injectable({
    providedIn: 'root'
})
export class NgxValidatorLoader {
    private config: NgxValidatorGlobalConfig;

    private getDefaultValidationMessage(key: string) {
        if (this.config.globalValidationMessages && this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        } else {
            return DEFAULT_GLOBAL_VALIDATION_MESSAGES[key];
        }
    }

    get validationMessages() {
        return this.config.validationMessages;
    }

    get validationFeedbackStrategy(): IValidationFeedbackStrategy {
        if (!this.config.validationFeedbackStrategy) {
            this.config.validationFeedbackStrategy = ValidationFeedbackStrategyBuilder.bootstrap();
        }
        return this.config.validationFeedbackStrategy;
    }

    get validateOn () {
        if (!this.config.validateOn) {
            this.config.validateOn = 'submit';
        }
        return this.config.validateOn;
    }

    constructor(
        @Optional()
        @Inject(NGX_VALIDATOR_CONFIG)
        config: NgxValidatorGlobalConfig
    ) {
        this.config = Object.assign({}, defaultValidatorConfig, config);
    }

    /**
     * get validation error messages
     * @param name formControl name, e.g. username or email
     * @param key validator name, e.g. required or pattern
     */
    getErrorMessage(name: string, key: string, validationErrorValues?: any) {
        let message = '';
        if (this.validationMessages[name] && this.validationMessages[name][key]) {
            message = this.validationMessages[name][key];
        } else {
            message = this.getDefaultValidationMessage(key);
        }
        return message;
    }

    // getErrorMessages(name: string, validationErrors: ValidationErrors) {
    //     const messages = [];
    //     for (const validationError in validationErrors) {
    //         if (validationErrors.hasOwnProperty(validationError)) {
    //             messages.push(this.getErrorMessage(name, validationError, validationErrors[validationError]));
    //         }
    //     }
    //     return messages;
    // }

    addValidationMessages(messages: NgxValidationMessages) {
        Object.assign(this.config.validationMessages, messages);
    }

    setGlobalValidationMessages(validationMessages: Dictionary<string>) {
        this.config.globalValidationMessages = validationMessages;
    }
}
