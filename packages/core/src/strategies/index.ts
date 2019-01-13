import { NoopValidationFeedbackStrategy } from './noop-validation-feedback-strategy';
import { BootstrapValidationFeedbackStrategy } from './bootstrap-validation-feedback-strategy';
import { IValidationFeedbackStrategy } from './validation-feedback-strategy';

export class ValidationFeedbackStrategyBuilder {
    static noop(): IValidationFeedbackStrategy {
        return new NoopValidationFeedbackStrategy();
    }

    static bootstrap(): IValidationFeedbackStrategy {
        return new BootstrapValidationFeedbackStrategy();
    }
}

export { IValidationFeedbackStrategy, NoopValidationFeedbackStrategy, BootstrapValidationFeedbackStrategy };
