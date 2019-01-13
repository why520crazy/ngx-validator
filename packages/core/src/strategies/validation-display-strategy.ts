export interface IValidationDisplayStrategy {
    showError(element: HTMLElement, errorMessages: string[]): void;
    removeError(element: HTMLElement): void;
}
