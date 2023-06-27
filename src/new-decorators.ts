// 8.1 class decorator
export function freeze(data: string) {
    return function (originalClass: Function, { kind }: ClassDecoratorContext) {
        if (kind === 'class') {
            console.log(`Freezing the constructor ${data}`);
            Object.freeze(originalClass);
            Object.freeze(originalClass.prototype);
        }
    };
}

// 8.2 class decorator
export function logger(originalClass: Function, { kind }: ClassDecoratorContext) {
    if (kind === 'class') {
        const newConstructor = function (this: any) {
            console.log('Creating new instance.');
            console.log(originalClass.name);
            this.age = 30;
        };

        newConstructor.prototype = Object.create(originalClass.prototype);
        newConstructor.prototype.constructor = originalClass;

        // добавим новый метод
        newConstructor.prototype.printLibrarian = function () {
            console.log(`Librarian name:  ${this.name}, Librarian age: ${this.age}`);
        };

        return newConstructor;
    }
}

// Home tasks
// class decorator
class InstanceCollector {
    instances = new Set(); // or WeakSet();
    install = (originalClass: any, { kind }: ClassDecoratorContext) => {
        if (kind === 'class') {
            const that = this;
            const newConstructor = function (...args: unknown[]) {
                const inst = new originalClass(...args);
                that.instances.add(inst);
                return inst;
            } as typeof originalClass;

            newConstructor.prototype = originalClass.prototype;
            return newConstructor;
        }
    };
}

const collector = new InstanceCollector();

@collector.install
class MyClass {}

const inst1 = new MyClass();
const inst2 = new MyClass();
const inst3 = new MyClass();

console.log(collector.instances.size);
console.log(inst1 instanceof MyClass);

// 8.3 method decorator
export function writable(isWritable: boolean) {
    return function (originalMethod: Function, { kind, name, addInitializer }: ClassMethodDecoratorContext) {
        if (kind === 'method') {
            addInitializer(function () {
                Object.defineProperty(this, name, {
                    writable: isWritable,
                    value: originalMethod,
                });
            });
        }
    };
}

// 8.4 method decorator
export function timeout(ms: number = 0) {
    return function (originalMethod: Function, { kind }: ClassMethodDecoratorContext) {
        if (kind === 'method') {
            function replacedMethod(this: any, ...args: unknown[]): void {
                if (window.confirm('Are you sure?')) {
                    setTimeout(() => {
                        originalMethod.apply(this, args);
                    }, ms);
                }
            }

            return replacedMethod;
        }
    };
}

// 8.5 field decorator
export function setInitial(inputValue: number) {
    return function (value: undefined, { kind }: ClassFieldDecoratorContext) {
        if (kind === 'field') {
            return function (initialValue: unknown) {
                return inputValue;
            };
        }
    };
}

// 8.6 декоратор автоаксесора
export function format<This, Return>(pref: string = 'Mr/Mrs') {
    return function <This, Return>(
        target: ClassAccessorDecoratorTarget<This, Return>,
        { kind }: ClassAccessorDecoratorContext,
    ) {
        if (kind === 'accessor') {
            const result: ClassAccessorDecoratorResult<This, Return> = {
                get(this: This) {
                    return `${pref} ${target.get.call(this)}` as Return;
                },
                set(this: This, value: any) {
                    target.set.call(this, value);
                },
            };
            return result;
        }
    };
}

// 8.7 setter decorator
export function positiveInteger(originalSet: Function, { kind }: ClassSetterDecoratorContext) {
    if (kind === 'setter') {
        const set = function (this: any, value: number) {
            if (value <= 0 || !Number.isInteger(value)) {
                throw new Error('Invalid value');
            }

            if (originalSet) {
                originalSet.call(this, value);
            }
        };

        return set;
    }
}


