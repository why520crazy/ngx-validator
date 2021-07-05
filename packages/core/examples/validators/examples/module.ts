import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxValidatorModule } from '@why520crazy/ngx-validator';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxValidatorsMinExampleComponent } from './min/min.component';
import { NgxValidatorsMaxExampleComponent } from './max/max.component';
import { NgxValidatorsUniqueCheckExampleComponent } from './unique-check/unique-check.component';

@NgModule({
    declarations: [
        NgxValidatorsMinExampleComponent,
        NgxValidatorsMaxExampleComponent,
        NgxValidatorsUniqueCheckExampleComponent
    ],
    imports: [CommonModule, NgxValidatorModule, ReactiveFormsModule],
    exports: [],
    providers: []
})
export class NgxValidatorsExamplesModule {}
