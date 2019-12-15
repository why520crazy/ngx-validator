import { TestBed, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { Component, ViewChild } from '@angular/core';
import { NgxFormValidatorDirective, NgxEnterKeyMode } from './form-validator.directive';
import { NgxValidatorModule } from '../module';
import { NgxValidatorConfig, DEFAULT_GLOBAL_VALIDATION_MESSAGES } from '../validator.class';
import { createFakeEvent, createKeyboardEvent, dispatchEvent } from '../testing';
import { By } from '@angular/platform-browser';
import { FormsModule, NgForm, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ValidationFeedbackStrategy } from '../strategies';
import { NgxValidators } from '../validators';

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

const CUSTOM_INVALID_CLASS = 'custom-invalid';
const CUSTOM_INVALID_FEEDBACK_CLASS = 'custom-invalid-feedback';

describe('ngxFormValidator', () => {
    let fixture: ComponentFixture<SimpleReactiveFormDemoComponent | SimpleTemplateDrivenDemoComponent>;

    function setFixtureValue(
        value: ComponentFixture<SimpleReactiveFormDemoComponent | SimpleTemplateDrivenDemoComponent>
    ) {
        fixture = value;
    }

    function assertEmailFeedbackIsValid() {
        const emailInputElement = fixture.nativeElement.querySelector('#email1');
        const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
        expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(false);
        expect(feedbackElement).toBeFalsy();
        return {
            emailInputElement,
            feedbackElement
        };
    }

    function assertEmailFeedbackError(emailErrorMessage = DEFAULT_GLOBAL_VALIDATION_MESSAGES.required) {
        const emailInputElement = fixture.nativeElement.querySelector('#email1');
        const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
        expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(true);
        expect(feedbackElement).toBeTruthy();
        expect(feedbackElement.textContent).toContain(emailErrorMessage);

        return {
            emailInputElement,
            feedbackElement
        };
    }

    function submitFormAndAssertEmailFeedbackError(emailRequiredMessage: string) {
        fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));
        return assertEmailFeedbackError(emailRequiredMessage);
    }

    describe('Reactive forms', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [SimpleReactiveFormDemoComponent],
                imports: [NgxValidatorModule, FormsModule, CommonModule, ReactiveFormsModule],
                providers: []
            });
            fixture = TestBed.createComponent(SimpleReactiveFormDemoComponent);
            setFixtureValue(fixture);
        });

        it('should be created ngxFormValidator directive', () => {
            expect(fixture.componentInstance.ngxFormValidator).toBeTruthy();
        });

        it(`should be same input's config and ngxFormValidator 's config`, () => {
            const inputConfig: NgxValidatorConfig = {
                validationFeedbackStrategy: new CustomValidationFeedbackStrategy(),
                validationMessages: {
                    email: {
                        required: 'email is required'
                    }
                }
            };
            fixture.componentInstance.validatorConfig = inputConfig;
            fixture.detectChanges();
            expect(fixture.componentInstance.ngxFormValidator.validator.validatorConfig).toEqual(inputConfig);
        });

        it('should show required error feedback when submit with empty email value', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            submitFormAndAssertEmailFeedbackError(DEFAULT_GLOBAL_VALIDATION_MESSAGES.required);
        }));

        it('should show config required error feedback when submit with empty email value', fakeAsync(() => {
            const emailRequiredMessage = 'email is required message';
            fixture.componentInstance.validatorConfig = {
                validationMessages: {
                    email: {
                        required: emailRequiredMessage
                    }
                }
            };
            fixture.detectChanges();
            tick();
            submitFormAndAssertEmailFeedbackError(emailRequiredMessage);
        }));

        it('should remove error feedback when input value', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const { emailInputElement } = submitFormAndAssertEmailFeedbackError(
                DEFAULT_GLOBAL_VALIDATION_MESSAGES.required
            );
            emailInputElement.value = 'invalid email';
            dispatchEvent(emailInputElement, createFakeEvent('input'));
            fixture.detectChanges();
            expect(
                (fixture as ComponentFixture<SimpleReactiveFormDemoComponent>).componentInstance.formGroup.value.email
            ).toBe(emailInputElement.value);

            expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(false);
            const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            expect(feedbackElement).toBeFalsy();

            submitFormAndAssertEmailFeedbackError(DEFAULT_GLOBAL_VALIDATION_MESSAGES.email);
        }));

        it('should remove error feedback when submit after input correct email', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const { emailInputElement } = submitFormAndAssertEmailFeedbackError(
                DEFAULT_GLOBAL_VALIDATION_MESSAGES.required
            );
            emailInputElement.value = 'why520crazy@163.com';
            dispatchEvent(emailInputElement, createFakeEvent('input'));
            fixture.detectChanges();
            expect(
                (fixture as ComponentFixture<SimpleReactiveFormDemoComponent>).componentInstance.formGroup.value.email
            ).toBe(emailInputElement.value);

            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));

            expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(false);
            const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            expect(feedbackElement).toBeFalsy();
        }));

        it('should not call submit function when ngForm is invalid', fakeAsync(() => {
            const spy = jasmine.createSpy('submit spy');
            fixture.componentInstance.submit = spy;
            fixture.detectChanges();
            tick();
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));
            expect(spy).not.toHaveBeenCalled();
        }));

        it('should call submit function when ngForm is valid', fakeAsync(() => {
            (fixture as ComponentFixture<SimpleReactiveFormDemoComponent>).componentInstance.formGroup.setValue({
                email: 'why520crazy@163.com',
                description: ''
            });
            const spy = jasmine.createSpy('submit spy');
            fixture.componentInstance.submit = spy;
            fixture.detectChanges();
            tick();
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));
            expect(spy).toHaveBeenCalled();
        }));

        it('should trigger form submit validate when press enter key and focus on input', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const emailInputElement = fixture.nativeElement.querySelector('#email1');
            dispatchEvent(emailInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            assertEmailFeedbackError();
        }));

        it('should not trigger form submit validate when press enter key and focus on textarea', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const textareaInputElement = fixture.nativeElement.querySelector('#description1');
            // focus textareaInputElement
            textareaInputElement.focus();
            dispatchEvent(textareaInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            tick();
            assertEmailFeedbackIsValid();
        }));

        it('should trigger form submit validate when enterKeyMode is alwaysSubmit press enter key and focus on textarea', fakeAsync(() => {
            fixture.componentInstance.enterKeyMode = NgxEnterKeyMode.alwaysSubmit;
            fixture.detectChanges();
            tick();
            const textareaInputElement = fixture.nativeElement.querySelector('#description1');
            // focus textareaInputElement
            textareaInputElement.focus();
            dispatchEvent(textareaInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            tick();
            assertEmailFeedbackError();
        }));
    });

    describe('Template Driven', () => {
        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [SimpleTemplateDrivenDemoComponent],
                imports: [NgxValidatorModule, FormsModule, CommonModule],
                providers: []
            });
            fixture = TestBed.createComponent(SimpleTemplateDrivenDemoComponent);
            setFixtureValue(fixture);
        });

        it('should be created ngxFormValidator directive', () => {
            expect(fixture.componentInstance.ngxFormValidator).toBeTruthy();
        });

        it(`should be same input's config and ngxFormValidator 's config`, () => {
            const inputConfig: NgxValidatorConfig = {
                validationFeedbackStrategy: new CustomValidationFeedbackStrategy(),
                validationMessages: {
                    hello: {
                        required: 'hello is required'
                    }
                }
            };
            fixture.componentInstance.validatorConfig = inputConfig;
            fixture.detectChanges();
            expect(fixture.componentInstance.ngxFormValidator.validator.validatorConfig).toEqual(inputConfig);
        });

        it('should show required error feedback when submit with empty email value', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            // const ngxFormValidator = fixture.debugElement.children[0].injector.get(NgxFormValidatorDirective);
            // const ngxFormValidator = fixture.debugElement.query(By.directive(NgxFormValidatorDirective));
            submitFormAndAssertEmailFeedbackError(DEFAULT_GLOBAL_VALIDATION_MESSAGES.required);
        }));

        it('should show config required error feedback when submit with empty email value', fakeAsync(() => {
            const emailRequiredMessage = 'email is required message';
            fixture.componentInstance.validatorConfig = {
                validationMessages: {
                    email: {
                        required: emailRequiredMessage
                    }
                }
            };
            fixture.detectChanges();
            tick();
            submitFormAndAssertEmailFeedbackError(emailRequiredMessage);
        }));

        it('should remove error feedback when input value', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const { emailInputElement } = submitFormAndAssertEmailFeedbackError(
                DEFAULT_GLOBAL_VALIDATION_MESSAGES.required
            );
            emailInputElement.value = 'invalid email';
            dispatchEvent(emailInputElement, createFakeEvent('input'));
            fixture.detectChanges();
            expect(fixture.componentInstance.model.email).toBe(emailInputElement.value);

            expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(false);
            const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            expect(feedbackElement).toBeFalsy();

            submitFormAndAssertEmailFeedbackError(DEFAULT_GLOBAL_VALIDATION_MESSAGES.email);
        }));

        it('should remove error feedback when submit after input correct email', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const { emailInputElement } = submitFormAndAssertEmailFeedbackError(
                DEFAULT_GLOBAL_VALIDATION_MESSAGES.required
            );
            emailInputElement.value = 'why520crazy@163.com';
            dispatchEvent(emailInputElement, createFakeEvent('input'));
            fixture.detectChanges();
            expect(fixture.componentInstance.model.email).toBe(emailInputElement.value);

            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));

            expect(emailInputElement.classList.contains(INVALID_CLASS)).toBe(false);
            const feedbackElement = fixture.nativeElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            expect(feedbackElement).toBeFalsy();
        }));

        it('should not call submit function when ngForm is invalid', fakeAsync(() => {
            const spy = jasmine.createSpy('submit spy');
            fixture.componentInstance.submit = spy;
            fixture.detectChanges();
            tick();
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));
            expect(spy).not.toHaveBeenCalled();
        }));

        it('should call submit function when ngForm is valid', fakeAsync(() => {
            fixture.componentInstance.model.email = 'why520crazy@163.com';
            const spy = jasmine.createSpy('submit spy');
            fixture.componentInstance.submit = spy;
            fixture.detectChanges();
            tick();
            expect(spy).not.toHaveBeenCalled();
            fixture.componentInstance.ngxFormValidator.submit(createFakeEvent('click'));
            expect(spy).toHaveBeenCalled();
        }));

        it('should trigger form submit validate when press enter key and focus on input', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const emailInputElement = fixture.nativeElement.querySelector('#email1');
            dispatchEvent(emailInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            assertEmailFeedbackError();
        }));

        it('should not trigger form submit validate when press enter key and focus on textarea', fakeAsync(() => {
            fixture.detectChanges();
            tick();
            const textareaInputElement = fixture.nativeElement.querySelector('#description1');
            // focus textareaInputElement
            textareaInputElement.focus();
            dispatchEvent(textareaInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            tick();
            assertEmailFeedbackIsValid();
        }));

        it('should trigger form submit validate when enterKeyMode is alwaysSubmit press enter key and focus on textarea', fakeAsync(() => {
            fixture.componentInstance.enterKeyMode = NgxEnterKeyMode.alwaysSubmit;
            fixture.detectChanges();
            tick();
            const textareaInputElement = fixture.nativeElement.querySelector('#description1');
            // focus textareaInputElement
            textareaInputElement.focus();
            dispatchEvent(textareaInputElement, createKeyboardEvent('keydown', 13));
            fixture.detectChanges();
            tick();
            assertEmailFeedbackError();
        }));
    });
});

@Component({
    selector: 'test-simple-template-driven-demo',
    template: `
        <form name="demoForm" [ngxFormValidator]="validatorConfig" [enterKeyMode]="enterKeyMode">
            <div class="form-group">
                <label for="email1">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email1"
                    [(ngModel)]="model.email"
                    required
                    email
                    placeholder="Enter email (validators: required & email)"
                />
            </div>
            <div class="form-group">
                <label for="description1">Description1</label>
                <textarea
                    type="text"
                    class="form-control"
                    name="description"
                    id="description1"
                    [(ngModel)]="model.description"
                    placeholder="Enter description"
                ></textarea>
            </div>
            <div><button class="btn btn-primary" (ngxFormSubmit)="submit()">Submit</button></div>
        </form>
    `
})
class SimpleTemplateDrivenDemoComponent {
    enterKeyMode: NgxEnterKeyMode;

    validatorConfig: NgxValidatorConfig = null;

    model = {
        email: '',
        description: ''
    };

    @ViewChild(NgxFormValidatorDirective, { static: true }) ngxFormValidator: NgxFormValidatorDirective;

    constructor() {}

    submit() {}
}

@Component({
    selector: 'test-simple-reactive-form-demo',
    template: `
        <form
            name="demoForm"
            [formGroup]="formGroup"
            [ngxFormValidator]="validatorConfig"
            [enterKeyMode]="enterKeyMode"
        >
            <div class="form-group">
                <label for="email1">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    name="email"
                    id="email1"
                    formControlName="email"
                    placeholder="Enter email (validators: required & email)"
                />
            </div>
            <div class="form-group">
                <label for="description1">Description1</label>
                <textarea
                    type="text"
                    class="form-control"
                    name="description"
                    id="description1"
                    formControlName="description"
                    placeholder="Enter description"
                ></textarea>
            </div>
            <div><button class="btn btn-primary" (ngxFormSubmit)="submit()">Submit</button></div>
        </form>
    `
})
class SimpleReactiveFormDemoComponent {
    enterKeyMode: NgxEnterKeyMode;

    validatorConfig: NgxValidatorConfig = null;

    formGroup: FormGroup;

    model = {
        email: '',
        description: ''
    };

    @ViewChild(NgxFormValidatorDirective, { static: true })
    ngxFormValidator: NgxFormValidatorDirective;

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            description: ['']
        });
    }

    submit() {}
}

class CustomValidationFeedbackStrategy implements ValidationFeedbackStrategy {
    showError(element: HTMLElement, errorMessages: string[]): void {
        element.classList.add(CUSTOM_INVALID_CLASS);
        if (element && element.parentElement) {
            const documentFrag = document.createDocumentFragment();
            const node = document.createElement('SPAN');
            const textNode = document.createTextNode(errorMessages[0]);
            node.appendChild(textNode);
            node.setAttribute('class', CUSTOM_INVALID_FEEDBACK_CLASS);
            documentFrag.appendChild(node);
            element.parentElement.append(documentFrag);
        }
    }

    removeError(element: HTMLElement): void {
        element.classList.remove(CUSTOM_INVALID_CLASS);
        if (element && element.parentElement) {
            const invalidFeedback = element.parentElement.querySelector(`.${CUSTOM_INVALID_FEEDBACK_CLASS}`);
            if (invalidFeedback) {
                element.parentElement.removeChild(invalidFeedback);
            }
        }
    }
}
