/* eslint-disable no-redeclare */
import { Book, TOptions, LibMgrCallback } from './interfaces';
import { BookProperties, BookOrUndefined } from './types';
import { Category } from './enums';
import RefBook from './classes/encyclopedia';

export function getAllBooks(): readonly Book[] {
    const books: readonly Book[] = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            author: 'Evan Burchard',
            available: true,
            category: Category.JavaScript,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            author: 'Liang Yuxian Eugene',
            available: false,
            category: Category.JavaScript,
        },
        {
            id: 3,
            title: 'CSS Secrets',
            author: 'Lea Verou',
            available: true,
            category: Category.CSS,
        },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            author: 'Andrea Chiarelli',
            available: true,
            category: Category.JavaScript,
        },
    ];

    return books;
}

export function logFirstAvailable(books: readonly any[] = getAllBooks()): void {
    const numberOfBooks: number = books.length;
    const title = books.find(({ available }) => available)?.title;

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`First Available Book: ${title}`);
}

export function getBookTitlesByCategory(categoryFilter: Category = Category.JavaScript): Array<string> {
    console.log(`Getting books in category: ${Category[categoryFilter]}`);

    const books = getAllBooks();

    return books.filter(({ category }) => category === categoryFilter).map(({ title }) => title);
}

export function logBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? {};
    return [title, author];
}

export function calcTotalPages(): bigint {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];

    let result = data.reduce((acc: bigint, obj) => {
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);

    return result;
}

export function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Creating customer ${name}`);

    age && console.log(`Age: ${age}`);
    city && console.log(`City: ${city}`);
}

export function getBookByID(id: Book['id']): BookOrUndefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Checking out books for ${customer}`);

    let titles: string[] = [];

    bookIDs.forEach(id => {
        const book = getBookByID(id);
        if (book?.available) titles.push(book.title);
    });

    return titles;
}

export function getTitles(author: string): string[];
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
export function getTitles(...args: any[]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(({ author }) => author === arg).map(({ title }) => title);
        } else if (typeof arg === 'boolean') {
            return books.filter(({ available }) => available === arg).map(({ title }) => title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return [];
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

export function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should have been a string.');
    }
}

export function bookTitleTransform(title: any) {
    assertStringValue(title);

    return [...title].reverse().join('');
}

export function purge<T>(inventory: Array<T>): Array<T> {
    return inventory.slice(2);
}
// Автор: Yevhen_Zakharevych@epam.com
function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not instance of RefBook');
    }
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}

export function setDefaultConfig(options: TOptions): TOptions {
    options.duration ??= 100;
    options.speed ??= 25;
    return options;
}

export function getObjectProperty<TObject, TKey extends keyof TObject>(
    obj: TObject, prop: TKey): TObject[TKey] | string {
    const value = obj[prop];
    return typeof value === 'function' ? value.name : value;
}

export function getBooksByCategory(category: Category, callback: LibMgrCallback): void {
    setTimeout(() => {
        try {
            const foundBooks: string[] = getBookTitlesByCategory(category);

            if (foundBooks.length > 0) {
                callback(null, foundBooks);
            } else {
                throw new Error('No books found.');
            }
        } catch (error: any) {
            callback(error, null);
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void {
    if (err) {
        console.log(`Error message: ${err.message}`);
    } else {
        console.log('Found the following titles:');
        console.log(titles);
    }
}

export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    let p: Promise<string[]> = new Promise((resolve, reject) => {
        setTimeout(() => {
            let foundBooks: string[] = getBookTitlesByCategory(category);

            if (foundBooks.length > 0) {
                resolve(foundBooks);
            } else {
                reject('No books found for that category.');
            }
        }, 2000);
    });

    return p;
}
