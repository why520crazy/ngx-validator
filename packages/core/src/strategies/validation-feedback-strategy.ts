export interface ValidationFeedbackStrategy {
    showError(element: HTMLElement, errorMessages: string[]): void;
    removeError(element: HTMLElement): void;
}
