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

function makeProperty<T>(
    prototype: any,
    propertyName: string,
    getTransformer: (value: any) => T,
    setTransformer: (value: any) => T,
) {
    // меп для хранения данных для каждого экземпляра
    const values = new Map<any, T>();

    // на прототипе определяем setter
    // этот сетер запуститься,
    // когда первый раз будем устанавливать значение свойства экземпляра,
    // так как на экземпляре не будет сетера для свойства,
    // то будет использоваться сетер из прототипа
    Object.defineProperty(prototype, propertyName, {
        set(firstValue: any) {
            // внутри сетера есть доступ к this - это и будет экземпляр класса
            // на экземпляре определяем getter & setter для сойства
            Object.defineProperty(this, propertyName, {
                // getter берет значение из мепа для текущего экземпляра
                get() {
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                // setter записывает значение для текущего экземпляра в меп,
                // при этом вызывает еще функцию преобразования значения
                set(value: any) {
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                // устанавливаем, что свойство перечисляемое
                enumerable: true,
            });
            // Установка итогового значения на экземпляре
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
}

// property decorator factory
export function format(pref: string = 'Mr./Mrs.') {
    // property decorator
    return function (target: any, propertyName: string) {
        makeProperty(
            target,
            propertyName,
            value => `${pref} ${value}`,
            value => value,
        );
    };
}
