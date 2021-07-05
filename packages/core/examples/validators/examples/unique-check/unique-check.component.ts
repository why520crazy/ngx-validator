import { NgxValidatorConfig } from '@why520crazy/ngx-validator';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'ngx-validators-unique-check-example',
    templateUrl: './unique-check.component.html',
    styleUrls: ['./unique-check.component.scss']
})
export class NgxValidatorsUniqueCheckExampleComponent implements OnInit {
    validatorConfig: NgxValidatorConfig;

    value: number;

    message: string;

    uniqueCheck = (value: string) => {
        return value === 'peter' ? of(true) : of(false);
    };

    constructor() {}

    ngOnInit(): void {}

    submit() {
        this.message = 'This form has submit';
    }
}
