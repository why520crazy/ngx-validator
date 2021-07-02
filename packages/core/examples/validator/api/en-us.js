module.exports = [
    {
        type: 'directive',
        name: '[ngxFormValidator]',
        description: 'Form validator',
        properties: [
            {
                name: 'ngxFormValidator',
                type: `NgxValidatorConfig`,
                default: `null`,
                description: 'validator congif'
            }
        ]
    },
    {
        type: 'interface',
        name: 'NgxValidatorConfig',
        description: 'Validator Config',
        properties: [
            {
                name: 'validateOn',
                type: `'submit' | 'blur' | 'change'`,
                default: `submit`,
                description: 'validate trigger'
            },
            {
                name: 'validationMessages',
                type: `Record<string, Record<string, string>>`,
                default: `null`,
                description: `validation messages, e.g. \n { username: { required: 'username is required'}`
            },
            {
                name: 'validationFeedbackStrategy',
                type: `ValidationFeedbackStrategy`,
                default: `null`,
                description: `validation feedback strategy`
            }
        ]
    }
];
