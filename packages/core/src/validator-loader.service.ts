import { InjectionToken, Inject, Injectable, Optional } from '@angular/core';
import {
    NgxValidatorGlobalConfig,
    NgxValidationMessages,
    Dictionary,
    NGX_VALIDATOR_CONFIG
} from './validator.class';
import { ValidationErrors } from '@angular/forms';
import * as helpers from './helpers';
import { IValidationDisplayStrategy, ValidationDisplayStrategyBuilder } from './strategies';

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

const defaultValidatorConfig: NgxValidatorGlobalConfig = {
    validationDisplayStrategy: ValidationDisplayStrategyBuilder.bootstrap(),
    validationMessages: {}
};

const globalValidationMessages = {
    required: '该选项不能为空',
    maxlength: '该选项输入值长度不能大于{maxlength}',
    minlength: '该选项输入值长度不能小于{minlength}',
    thyUniqueCheck: '输入值已经存在，请重新输入',
    email: '输入邮件的格式不正确',
    repeat: '两次输入不一致',
    pattern: '该选项输入格式不正确',
    number: '必须输入数字',
    url: '输入URL格式不正确',
    max: '该选项输入值不能大于{max}',
    min: '该选项输入值不能小于{min}'
};

@Injectable({
    providedIn: 'root'
})
export class NgxValidatorLoader {
    private config: NgxValidatorGlobalConfig;

    private _getDefaultValidationMessage(key: string) {
        if (this.config.globalValidationMessages && this.config.globalValidationMessages[key]) {
            return this.config.globalValidationMessages[key];
        } else {
            return globalValidationMessages[key];
        }
    }

    constructor(
        @Optional()
        @Inject(NGX_VALIDATOR_CONFIG)
        config: NgxValidatorGlobalConfig
    ) {
        this.config = Object.assign({}, defaultValidatorConfig, config);
    }

    get validationMessages() {
        return this.config.validationMessages;
    }

    get validationStrategy(): IValidationDisplayStrategy {
        if (!this.config.validationDisplayStrategy) {
            this.config.validationDisplayStrategy = ValidationDisplayStrategyBuilder.bootstrap();
        }
        return this.config.validationDisplayStrategy;
    }

    getErrorMessage(name: string, key: string) {
        if (this.validationMessages[name] && this.validationMessages[name][key]) {
            return this.validationMessages[name][key];
        } else {
            return this._getDefaultValidationMessage(key);
        }
    }

    getErrorMessages(name: string, validationErrors: ValidationErrors) {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this.getErrorMessage(name, validationError));
            }
        }
        return messages;
    }

    addValidationMessages(messages: NgxValidationMessages) {
        Object.assign(this.config.validationMessages, messages);
    }

    setGlobalValidationMessages(validationMessages: Dictionary<string>) {
        this.config.globalValidationMessages = validationMessages;
    }
}
