export function sealed(name: string) {
    return function (target: Function): void {
        console.log(`Sealing the constructor: ${name}`);
        Object.seal(target);
        Object.seal(target.prototype);
    };
}

export function logger<TFunction extends Function>(target: TFunction): TFunction {
    let newConstructor: Function = function (this: any) {
        console.log('Creating new instance.');
        console.log(target);

        this.age = 30;
    };
    // это нужно так, как добавлен декоратор sealed и он запрещает добавлять методы
    newConstructor.prototype = Object.create(target.prototype);
    newConstructor.prototype.constructor = target;

    // добавим новый метод
    newConstructor.prototype.printLibrarian = function () {
        console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
    };

    return <TFunction>newConstructor;
}
export function writable(isWritable: boolean) {
    return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
        console.log(`Setting ${propertyKey}.`);
        descriptor.writable = isWritable;
    };
}

export function timeout(milliseconds: number = 0) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any) {
            if (window.confirm('Are you sure?')) {
                setTimeout(() => {
                    originalMethod.apply(this, args);
                }, milliseconds);
            }
        };
    };
}

export function logParameter(target: object | Function, methodName: string, index: number) {
    const key = `${methodName}_decor_params_indexes`;
    const proto = typeof target === 'function' ? target.prototype : target;

    (proto[key] ??= []).push(index);
}

export function logMethod(target: object | Function, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: Parameters<typeof originalMethod>): ReturnType<typeof originalMethod> {
        const key = `${methodName}_decor_params_indexes`;
        const proto = typeof target === 'function' ? target.prototype : target;
        const indexes = proto[key];

        if (Array.isArray(indexes)) {
            args.forEach((arg, index) => {
                if (indexes.includes(index)) {
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }
        console.log('this: ', this);
        const result = originalMethod.apply(this, args);
        return result;
    };
}
