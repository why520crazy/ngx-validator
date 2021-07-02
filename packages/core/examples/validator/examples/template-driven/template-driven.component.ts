import { Component, HostBinding } from '@angular/core';
import { NgxValidatorConfig, NgxValidateOn } from '@why520crazy/ngx-validator';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'ngx-validator-template-driven-example',
    templateUrl: './template-driven.component.html',
    styleUrls: ['./template-driven.component.scss']
})
export class NgxValidatorTemplateDrivenExampleComponent {
    message = '';

    showSex = false;

    validateOn: NgxValidateOn = 'change';

    loadingDone = true;

    model = {
        username: '',
        email: '',
        password: '',
        number: '',
        sex: '',
        customSelectValue: ''
    };

    validatorConfig: NgxValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空',
                pattern: '用户名格式不正确，以字母，数字，下划线组成，首字母不能为数字，必须是2-20个字符',
                ngxUniqueCheck: '输入的用户名已经存在，请重新输入'
            }
        },
        validateOn: this.validateOn
    };

    changeValidateOn() {
        this.loadingDone = false;
        this.validatorConfig.validateOn = this.validateOn;
        setTimeout(() => {
            this.loadingDone = true;
        }, 0);
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
