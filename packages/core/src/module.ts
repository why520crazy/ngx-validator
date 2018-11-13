import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule({
    declarations: [],
    imports: [],
    exports: []
})
export class NgxValidatorModule {
    forRoot(): ModuleWithProviders {
        return {
            ngModule: NgxValidatorModule,
            providers: []
        };
    }
}
