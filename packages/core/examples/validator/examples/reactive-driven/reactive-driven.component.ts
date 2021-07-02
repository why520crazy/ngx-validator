import { Component, HostBinding } from '@angular/core';
import { NgxValidatorConfig, NgxValidators, NgxValidateOn } from '@why520crazy/ngx-validator';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'ngx-validator-reactive-driven-example',
    templateUrl: './reactive-driven.component.html',
    styleUrls: ['./reactive-driven.component.scss']
})
export class NgxValidatorReactiveDrivenExampleComponent {
    message = '';

    formGroup: FormGroup;

    model = {
        username: '',
        email: '',
        password: '',
        number: ''
    };

    validateOn: NgxValidateOn = 'change';

    loadingDone = true;

    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空',
                pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能为数字，必须是2-20个字符',
                ngxUniqueCheck: '输入的用户名已经存在，请重新输入'
            },
            street: {
                required: 'street不能为空'
            }
        },
        validateOn: this.validateOn
    };

    constructor(private formBuilder: FormBuilder) {
        this.formGroup = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            username: [
                '',
                [Validators.required, Validators.pattern('^[A-Za-z]{1}[0-9A-Za-z_]{1,19}')],
                NgxValidators.uniqueCheckValidator(this.checkUsername)
            ],
            password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
            number: ['', [Validators.required, Validators.max(100), Validators.min(10)]],
            address: this.formBuilder.group({
                street: ['', Validators.required],
                city: this.formBuilder.group({
                    country: ['', Validators.required]
                })
            })
        });
    }

    changeValidateOn() {
        this.loadingDone = false;
        this.validatorConfig.validateOn = this.validateOn;
        setTimeout(() => {
            this.loadingDone = true;
        });
    }

    checkUsername = (value: string) => {
        return value === 'peter' ? of(true).pipe(delay(200)) : of(false).pipe(delay(200));
    };

    setMessage(message: string) {
        this.message = message;
    }

    submit() {
        this.setMessage('This form has submit');
    }
}
