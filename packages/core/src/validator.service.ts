import { Injectable } from '@angular/core';
import {
    NgForm,
    AbstractControl,
    ValidationErrors,
    FormGroupDirective,
    FormControlName,
    NgControl
} from '@angular/forms';
import { NgxValidatorLoader } from './validator-loader.service';
import { NgxValidatorConfig, Dictionary } from './validator.class';
import { transformMessage } from './message-transformers';
import { tap } from 'rxjs/operators';

@Injectable()
export class NgxFormValidatorService {
    private _ngForm: NgForm | FormGroupDirective;

    private _formElement: HTMLElement;

    private _config: NgxValidatorConfig;

    private _controls: NgControl[] = [];

    // public errors: string[];

    // 记录所有元素的验证信息
    public validations: Dictionary<{
        hasError?: boolean;
        errorMessages?: string[];
    }> = {};

    private _getValidationFeedbackStrategy() {
        const strategy =
            (this._config && this._config.validationFeedbackStrategy) ||
            this.thyFormValidateLoader.validationFeedbackStrategy;
        if (!strategy) {
            throw new Error(`validation display strategy is null`);
        }
        return strategy;
    }

    private _getElement(name: string) {
        const element = this._formElement[name];
        if (element) {
            return element;
        } else {
            return this._formElement.querySelector(`[name='${name}']`);
        }
    }

    private _clearElementError(name: string) {
        if (this.validations[name] && this.validations[name].hasError) {
            this.validations[name].hasError = false;
            this.validations[name].errorMessages = [];
            this._getValidationFeedbackStrategy().removeError(this._getElement(name));
        }
    }

    _tryGetValidation(name: string) {
        if (!this.validations[name]) {
            this._initializeFormControlValidation(name, this._getControlByName(name));
        }
        return this.validations[name];
    }

    private _initializeFormControlValidation(name: string, control: AbstractControl | FormControlName | NgControl) {
        this.validations[name] = {
            hasError: false,
            errorMessages: []
        };
        control.valueChanges.subscribe(() => {
            this._clearElementError(name);
        });
    }

    private _restFormControlValidation(name: string) {
        const validation = this.validations[name];
        if (validation) {
            validation.hasError = false;
            validation.errorMessages = [];
        }
    }

    private _getValidationMessage(name: string, validationErrorName: string, validationErrorValues?: any) {
        let message = '';
        if (
            this._config &&
            this._config.validationMessages &&
            this._config.validationMessages[name] &&
            this._config.validationMessages[name][validationErrorName]
        ) {
            message = this._config.validationMessages[name][validationErrorName];
        } else {
            message = this.thyFormValidateLoader.getErrorMessage(name, validationErrorName);
        }

        return transformMessage(validationErrorName, message, validationErrorValues);
    }

    private _getValidationMessages(name: string, validationErrors: ValidationErrors) {
        const messages = [];
        for (const validationError in validationErrors) {
            if (validationErrors.hasOwnProperty(validationError)) {
                messages.push(this._getValidationMessage(name, validationError, validationErrors[validationError]));
            }
        }
        return messages;
    }

    private _setControlValidationError(name: string, errorMessages: string[]) {
        const validation = this._tryGetValidation(name);
        validation.errorMessages = errorMessages;
        validation.hasError = true;
        this._getValidationFeedbackStrategy().showError(this._getElement(name), errorMessages);
    }

    get validatorConfig() {
        return this._config;
    }

    constructor(private thyFormValidateLoader: NgxValidatorLoader) {}

    initialize(ngForm: NgForm | FormGroupDirective, formElement: HTMLElement) {
        this._ngForm = ngForm;
        this._formElement = formElement;
    }

    initializeFormControlsValidation(controls: NgControl[]) {
        if ((this._config && this._config.validateOn === 'blur') || this.thyFormValidateLoader.validateOn === 'blur') {
            (controls || []).forEach((control: NgControl) => {
                if (!this._controls.find(item => item.name === control.name)) {
                    this._initializeFormControlValidation(control.name, control);
                    const element: HTMLElement = this._getElement(control.name);
                    if (element) {
                        element.onblur = (event: FocusEvent) => {
                            this.validateControl(control.name);
                        };
                    }
                }
            });
            this._controls = controls;
        }
    }

    setValidatorConfig(config: NgxValidatorConfig) {
        this._config = config;
    }

    private _getControls() {
        if (this._ngForm instanceof NgForm) {
            return (this._ngForm as NgForm).controls;
        } else if (this._ngForm instanceof FormGroupDirective) {
            const controls = {};
            (this._ngForm as FormGroupDirective).directives.forEach(directive => {
                controls[directive.name] = directive;
            });
            return controls;
        }
    }

    private _getControlByName(name: string): AbstractControl | FormControlName {
        const controls = this._getControls();
        return controls[name];
    }

    validateControl(name: string) {
        this._clearElementError(name);
        const control = this._getControlByName(name);
        if (control && control.invalid) {
            const errorMessages = this._getValidationMessages(name, control.errors);
            this._setControlValidationError(name, errorMessages);
        }
    }

    validateControls() {
        // 主要是 无法检测到 ngForm 的 controls 的变化，或者是我没有找到
        // 验证的时候循环 ngForm 的 controls 验证
        // 发现没有 validation 初始化一个，已经存在不会重新初始化，保存缓存数据
        const controls = this._getControls();
        for (const name in controls) {
            if (controls.hasOwnProperty(name)) {
                this._tryGetValidation(name);
                this.validateControl(name);
            }
        }
        // 移除已经不存在的 validation
        const names = Object.keys(this.validations);
        names.forEach(name => {
            if (!controls[name]) {
                delete this.validations[name];
            }
        });
    }

    validate($event?: Event): boolean {
        this._ngForm.onSubmit($event);
        this.validateControls();
        return this._ngForm.valid;
    }

    reset() {
        this._ngForm.reset();
        for (const name in this.validations) {
            if (this.validations.hasOwnProperty(name)) {
                this._restFormControlValidation(name);
                this._clearElementError(name);
            }
        }
    }

    markControlAsError(name: string, message: string) {
        this._clearElementError(name);
        this._setControlValidationError(name, [message]);
    }
}
