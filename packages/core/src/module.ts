import { NgModule, ModuleWithProviders } from '@angular/core';
import { NgxFormValidatorDirective } from './directives/form-validator.directive';
import { NgxFormSubmitDirective } from './directives/form-submit.directive';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [NgxFormValidatorDirective, NgxFormSubmitDirective],
    imports: [FormsModule],
    exports: [NgxFormValidatorDirective, NgxFormSubmitDirective, FormsModule]
})
export class NgxValidatorModule {
    forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxValidatorModule,
            providers: []
        };
    }
}
