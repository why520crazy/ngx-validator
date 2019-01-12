import { InjectionToken } from '@angular/core';

export interface Dictionary<T> {
    [key: string]: T;
}

export declare type NgxFormValidationMessages = Dictionary<Dictionary<string>>;

export interface NgxFormValidatorConfig {
    showElementError?:
        | boolean
        | ((element: HTMLElement, errorMessages: string[]) => void);
    removeElementError?: boolean | ((element: HTMLElement) => void);
    validationMessages?: NgxFormValidationMessages;
}
export interface NgxFormValidatorGlobalConfig extends NgxFormValidatorConfig {
    globalValidationMessages?: Dictionary<string>;
}

export const NGX_VALIDATOR_CONFIG = new InjectionToken<
NgxFormValidatorGlobalConfig
>('NGX_VALIDATION_CONFIG');
