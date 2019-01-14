function maxOrMinLengthTransformer(message: string, validationErrorValues: { requiredLength: number }): string {
    return message.replace(`{requiredLength}`, validationErrorValues.requiredLength.toString());
}

function maxTransformer(message: string, validationErrorValues: { max: number; actual: number }): string {
    return message.replace(`{max}`, validationErrorValues.max.toString());
}

function minxTransformer(message: string, validationErrorValues: { min: number; actual: number }): string {
    return message.replace(`{min}`, validationErrorValues.min.toString());
}

const transformerMap = {
    minlength: maxOrMinLengthTransformer,
    maxlength: maxOrMinLengthTransformer,
    max: maxTransformer,
    min: minxTransformer
};

export function transformMessage(validatorName: string, message: string, validationErrorValues: any) {
    if (transformerMap[validatorName] && validationErrorValues) {
        return transformerMap[validatorName](message, validationErrorValues);
    }
    return message;
}
