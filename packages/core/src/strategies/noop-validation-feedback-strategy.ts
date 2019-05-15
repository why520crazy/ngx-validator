import { ValidationFeedbackStrategy } from './validation-feedback-strategy';

export class NoopValidationFeedbackStrategy implements ValidationFeedbackStrategy {
    /** Does nothing, as this validation message display strategy is a no-op. */
    showError(element: HTMLElement, errorMessages: string[]): void {}

    removeError(element: HTMLElement): void {}
}
