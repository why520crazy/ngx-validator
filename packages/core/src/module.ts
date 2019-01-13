import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxFormValidatorDirective } from './directives/form-validator.directive';
import { NgxFormSubmitDirective } from './directives/form-submit.directive';
import {
    NgxValidatorGlobalConfig,
    NGX_VALIDATOR_CONFIG
} from './validator.class';

@NgModule({
    declarations: [NgxFormValidatorDirective, NgxFormSubmitDirective],
    imports: [FormsModule],
    exports: [NgxFormValidatorDirective, NgxFormSubmitDirective, FormsModule]
})
export class NgxValidatorModule {
    static forRoot(config: NgxValidatorGlobalConfig): ModuleWithProviders {
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
