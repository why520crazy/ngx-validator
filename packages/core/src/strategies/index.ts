import { NoopValidationFeedbackStrategy } from './noop-validation-feedback-strategy';
import { BootstrapValidationFeedbackStrategy } from './bootstrap-validation-feedback-strategy';
import { ValidationFeedbackStrategy } from './validation-feedback-strategy';

export class ValidationFeedbackStrategyBuilder {
    static noop(): ValidationFeedbackStrategy {
        return new NoopValidationFeedbackStrategy();
    }

    static bootstrap(): ValidationFeedbackStrategy {
        return new BootstrapValidationFeedbackStrategy();
    }
}

export { ValidationFeedbackStrategy, NoopValidationFeedbackStrategy, BootstrapValidationFeedbackStrategy };
