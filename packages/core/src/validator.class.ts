import { InjectionToken } from '@angular/core';
import { IValidationDisplayStrategy } from './strategies';

export interface Dictionary<T> {
    [key: string]: T;
}

export declare type NgxValidationMessages = Dictionary<Dictionary<string>>;

export interface NgxValidatorConfig {
    validationDisplayStrategy?: IValidationDisplayStrategy;
    validationMessages?: NgxValidationMessages;
}
export interface NgxValidatorGlobalConfig extends NgxValidatorConfig {
    globalValidationMessages?: Dictionary<string>;
}

export const NGX_VALIDATOR_CONFIG = new InjectionToken<NgxValidatorGlobalConfig>('NGX_VALIDATION_CONFIG');
