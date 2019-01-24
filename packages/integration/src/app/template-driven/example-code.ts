export const exampleCode = `
@Component({
    selector: 'app-example',
    template: \`
<form name="exampleForm" novalidate [ngxFormValidator]="validatorConfig">
   <div class="form-group">
       <label for="email1">Email address</label>
        <input type="email" class="form-control" name="email" id="email1"
                [(ngModel)]="model.email" required placeholder="Enter email" />
    </div>
    <button type="button" (ngxFormSubmit)="submit()" class="btn btn-primary">Submit</button>
 <form>
    \`
})
export class AppExampleComponent {

    model = {
        username: '',
        email: '',
        password: ''
    };

    validatorConfig: NgxFormValidatorConfig = {
        validationMessages: {
            username: {
                required: '用户名不能为空',
                pattern:
                    '用户名格式不正确，以字母，数字，下划线组成，首字母不能位数字，必须是2-20个字符'
            }
        }
    };

    submit() {
        console('This form has submit');
    }
}
`;
