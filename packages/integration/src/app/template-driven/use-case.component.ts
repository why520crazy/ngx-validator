import { Component, HostBinding } from '@angular/core';
import { NgxValidatorConfig } from '../../../../core/src/public_api';
import { exampleCode } from './example-code';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-template-driven-use-case',
    templateUrl: './use-case.component.html',
    styleUrls: ['./use-case.component.scss']
})
export class AppTemplateDrivenUseCaseComponent {
    @HostBinding('class.row') _isRow = true;

    message = '';

    exampleCode = exampleCode;

    showSex = false;

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
        }
    };

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
