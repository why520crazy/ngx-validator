export function isFunction(value: any) {
    const type = typeof value;
    return !!value && type === 'function';
}
