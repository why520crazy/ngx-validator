import { Component, OnInit } from '@angular/core';
import { NgxValidatorConfig } from '@why520crazy/ngx-validator';

@Component({
    selector: 'ngx-validators-min-example',
    templateUrl: './min.component.html',
    styleUrls: ['./min.component.scss']
})
export class NgxValidatorsMinExampleComponent implements OnInit {
    validatorConfig: NgxValidatorConfig;

    value: number;

    message: string;

    constructor() {}

    ngOnInit(): void {}

    submit() {
        this.message = 'This form has submit';
    }
}
