import { NoopValidationDisplayStrategy } from './noop-validation-display-strategy';
import { BootstrapValidationDisplayStrategy } from './bootstrap-validation-display-strategy';
import { IValidationDisplayStrategy } from './validation-display-strategy';

export class ValidationDisplayStrategyBuilder {
    static noop(): IValidationDisplayStrategy {
        return new NoopValidationDisplayStrategy();
    }

    static bootstrap(): IValidationDisplayStrategy {
        return new BootstrapValidationDisplayStrategy();
    }
}

export { IValidationDisplayStrategy, NoopValidationDisplayStrategy, BootstrapValidationDisplayStrategy };
