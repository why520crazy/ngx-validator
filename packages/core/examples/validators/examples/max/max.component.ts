import { Component, OnInit } from '@angular/core';
import { NgxValidatorConfig } from '@why520crazy/ngx-validator';

@Component({
    selector: 'ngx-validators-max-example',
    templateUrl: './max.component.html',
    styleUrls: ['./max.component.scss']
})
export class NgxValidatorsMaxExampleComponent implements OnInit {
    validatorConfig: NgxValidatorConfig;

    value: number;

    message: string;

    constructor() {}

    ngOnInit(): void {}

    submit() {
        this.message = 'This form has submit';
    }
}
