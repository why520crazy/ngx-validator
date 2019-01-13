export interface IValidationFeedbackStrategy {
    showError(element: HTMLElement, errorMessages: string[]): void;
    removeError(element: HTMLElement): void;
}
