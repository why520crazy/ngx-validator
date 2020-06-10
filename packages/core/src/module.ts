import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFormValidatorDirective } from './directives/form-validator.directive';
import { NgxFormSubmitDirective } from './directives/form-submit.directive';

// import { NgxUniqueCheckDirective } from './directives/form-unique-check.directive';
import { MaxValidatorDirective, MinValidatorDirective, NgxUniqueCheckDirective } from './directives/validators';

import { NgxValidatorGlobalConfig, NGX_VALIDATOR_CONFIG } from './validator.class';

const declarations = [
    NgxFormValidatorDirective,
    NgxFormSubmitDirective,
    NgxUniqueCheckDirective,
    MaxValidatorDirective,
    MinValidatorDirective
];

@NgModule({
    declarations: declarations,
    imports: [FormsModule],
    exports: [...declarations, FormsModule]
})
export class NgxValidatorModule {
    static forRoot(config: NgxValidatorGlobalConfig): ModuleWithProviders<NgxValidatorModule> {
        return {
            ngModule: NgxValidatorModule,
            providers: [
                {
                    provide: NGX_VALIDATOR_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
