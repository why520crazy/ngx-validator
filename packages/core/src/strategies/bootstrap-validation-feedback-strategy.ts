import { IValidationFeedbackStrategy } from './validation-feedback-strategy';

const INVALID_CLASS = 'is-invalid';
const INVALID_FEEDBACK_CLASS = 'invalid-feedback';

export class BootstrapValidationFeedbackStrategy implements IValidationFeedbackStrategy {
    constructor() {}

    showError(element: HTMLElement, errorMessages: string[]): void {
        if (element) {
            element.classList.add(INVALID_CLASS);
        }

        if (element && element.parentElement) {
            const documentFrag = document.createDocumentFragment();
            const divNode = document.createElement('DIV');
            const textNode = document.createTextNode(errorMessages[0]);
            divNode.appendChild(textNode);
            divNode.setAttribute('class', INVALID_FEEDBACK_CLASS);
            documentFrag.appendChild(divNode);
            element.parentElement.append(documentFrag);
        }
    }

    removeError(element: HTMLElement): void {
        if (element) {
            element.classList.remove(INVALID_CLASS);
        }
        if (element && element.parentElement) {
            const invalidFeedback = element.parentElement.querySelector(`.${INVALID_FEEDBACK_CLASS}`);
            if (invalidFeedback) {
                element.parentElement.removeChild(invalidFeedback);
            }
        }
    }
}
