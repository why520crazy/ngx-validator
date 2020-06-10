import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxValidatorModule } from '@why520crazy/ngx-validator';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { AppTemplateDrivenUseCaseComponent } from './template-driven/use-case.component';
import { AppReactiveDrivenUseCaseComponent } from './reactive-driven/use-case.component';
import { CustomSelectComponent } from './custom-select/custom-select.component';
import { CodeExampleComponent } from './code-example/code-example.component';
import { AppAddressControlComponent } from './address-control/address-control.component';

export function getHighlightLanguages() {
    return {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        scss: () => import('highlight.js/lib/languages/scss'),
        xml: () => import('highlight.js/lib/languages/xml')
    };
}

const GLOBAL_VALIDATION_MESSAGES = {
    required: 'This option cannot be empty',
    maxlength: 'The length of this option input cannot be greater than {requiredLength}',
    minlength: 'The length of this option input cannot be less than {requiredLength}',
    ngxUniqueCheck: 'The input value already exists, please re-enter',
    email: 'The format of the input message is incorrect',
    repeat: 'Inconsistent input twice',
    pattern: 'The option input format is incorrect',
    number: 'Must enter a number',
    url: 'The input URL format is incorrect',
    max: 'The input value of this option cannot be greater than {max}',
    min: 'The input value of this option cannot be less than {min}'
};

@NgModule({
    declarations: [
        AppComponent,
        CodeExampleComponent,
        AppTemplateDrivenUseCaseComponent,
        AppReactiveDrivenUseCaseComponent,
        CustomSelectComponent,
        AppAddressControlComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        NgxValidatorModule.forRoot({
            validateOn: 'submit',
            globalValidationMessages: GLOBAL_VALIDATION_MESSAGES
        }),
        HighlightModule,
        RouterModule.forRoot(
            [
                {
                    path: '',
                    redirectTo: 'template',
                    pathMatch: 'full'
                },
                {
                    path: 'template',
                    component: AppTemplateDrivenUseCaseComponent
                },
                {
                    path: 'reactive',
                    component: AppReactiveDrivenUseCaseComponent
                }
            ],
            {
                useHash: true
            }
        )
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: getHighlightLanguages()
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
