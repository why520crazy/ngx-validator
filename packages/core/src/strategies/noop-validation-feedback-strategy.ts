import { IValidationFeedbackStrategy } from './validation-feedback-strategy';

export class NoopValidationFeedbackStrategy implements IValidationFeedbackStrategy {
    /** Does nothing, as this validation message display strategy is a no-op. */
    showError(element: HTMLElement, errorMessages: string[]): void {}

    removeError(element: HTMLElement): void {}
}
