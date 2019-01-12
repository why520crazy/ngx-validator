import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxValidatorModule } from '../../../core/src/public_api';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, NgxValidatorModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
