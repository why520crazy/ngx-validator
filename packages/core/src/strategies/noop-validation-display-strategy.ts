import { IValidationDisplayStrategy } from './validation-display-strategy';

export class NoopValidationDisplayStrategy implements IValidationDisplayStrategy {
    /** Does nothing, as this validation message display strategy is a no-op. */
    showError(element: HTMLElement, errorMessages: string[]): void {}

    removeError(element: HTMLElement): void {}
}
