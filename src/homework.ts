// HomeTask 07.05

import { Book } from './interfaces';

// 1
type Res<T> = T extends true ? string : number;

function update<T extends boolean>(isStringOutput: T): Res<T> {
    if (isStringOutput) {
        return 'asd' as Res<T>;
    }
    return 12 as Res<T>;
}

const r1 = update(true);    // string
const r2 = update(false);   // number

// 2
export type PropsByType<T extends object, U extends T[keyof T]> = {
    [K in keyof T as T[K] extends U ? K : never]: T[K];
};
type OnlyBoolean = PropsByType<Book, boolean>;
type OnlyString = PropsByType<Book, string>;
