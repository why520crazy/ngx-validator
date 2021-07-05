import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxValidatorModule } from '@why520crazy/ngx-validator';
import { NgxValidatorTemplateDrivenExampleComponent } from './template-driven/template-driven.component';
import { NgxValidatorReactiveDrivenExampleComponent } from './reactive-driven/reactive-driven.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomSelectComponent } from './template-driven/custom-select/custom-select.component';

@NgModule({
    declarations: [
        NgxValidatorTemplateDrivenExampleComponent,
        NgxValidatorReactiveDrivenExampleComponent,
        CustomSelectComponent
    ],
    imports: [CommonModule, NgxValidatorModule, ReactiveFormsModule],
    exports: [],
    providers: []
})
export class NgxValidatorExamplesModule {}
