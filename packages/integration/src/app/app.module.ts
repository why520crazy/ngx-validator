import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxValidatorModule } from '../../../core/src/public_api';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';

export function hljsLanguages() {
    return [
        { name: 'typescript', func: typescript },
        { name: 'scss', func: scss },
        { name: 'xml', func: xml }
    ];
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        NgxValidatorModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
