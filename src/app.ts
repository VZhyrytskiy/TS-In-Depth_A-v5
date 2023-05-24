/* eslint-disable no-underscore-dangle */
/* eslint-disable no-redeclare */

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

showHello('greeting', 'TypeScript');

import { Category } from './enums';
import { Book, Logger, Author, Librarian, TOptions } from './interfaces';
import { UL, ReferenceItem, RefBook } from './classes';
import {
    assertStringValue,
    getAllBooks,
    bookTitleTransform,
    createCustomer,
    createCustomerID,
    getBookAuthorByIndex,
    getBookByID,
    getProperty,
    getBookTitlesByCategory,
    getTitles,
    logBookTitles,
    logFirstAvailable,
    printBook,
    сheckoutBooks,
    printRefBook,
    setDefaultConfig
} from './functions';


// ---------------------------------------------
// Task 02.01
// console.log(getAllBooks());

// const allBooks = getAllBooks();
// logFirstAvailable(allBooks);

// const javaScriptBooks = getBookTitlesByCategory(Category.JavaScript);
// logBookTitles(javaScriptBooks);

// const titleAndAuthor = getBookAuthorByIndex(2);
// console.log(titleAndAuthor);

// console.log(calcTotalPages());

// Task 03.01
// let myID = createCustomerID('Ann', 10);
// console.log(myID);

// the names of parameters are not important
// let idGenerator: (chars: string, num: number) => string;
// idGenerator = (name: string, id: number) => `${name}${id}`;
// idGenerator = createCustomerID;
// myID = idGenerator('Ann', 20);
// console.log(myID);

// Task 03.02
// createCustomer('Ann');
// createCustomer('Boris', 6);
// createCustomer('Clara', 12, 'Atlanta');

// const titles = getBookTitlesByCategory();
// console.log(titles);

// logFirstAvailable();
// console.log(getBookByID(1));

// console.log(getBookByID(1));

// const myBooks: string[] = сheckoutBooks('Ann', 1, 3, 4);
// console.log(myBooks);

// Task 03.03
// const titles = getTitles(false);
// console.log(titles);

// Task 03.04
// const title1 = getAllBooks()[0].title;
// const title2 = 11;
// const result1 = bookTitleTransform(title1);
// console.log(result1);
// const result2 = bookTitleTransform(title2);
// console.log(result2);

// Task 04.01
// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     pages: 200,
//     markDamaged: (reason: string) => console.log(`Damaged: ${reason}`),
// };
// printBook(myBook);
// myBook.markDamaged?.('missing back cover');

// Task 04.02
// let logDamage: Logger;
// logDamage = (damage: string) => console.log(`Damage reported: ${damage}`);
// logDamage('coffee stains');

// Task 04.03
// const favoriteAuthor: Author = {
//     email: 'Anna@gmail.com',
//     name: 'Anna',
//     numBooksPublished: 3,
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Boris',
//     email: 'Boris@gmail.com',
//     department: 'Classical Literature',
//     assistCustomer(name: string, bookTitle: string) {
//         console.log(`${name} is assisting ${this.name} with the book ${bookTitle}`);
//     }
// };

// Task 04.04
// const offer: any = {
//   book: {
//     title: 'Essential TypeScript'
//   }
// };

// console.log(offer?.magazine);
// console.log(offer?.magazine?.getTitle());
// console.log(offer?.book?.getTitle?.());
// console.log(offer.book.authors?.[0]);

// Task 04.05
// console.log(getProperty(getAllBooks()[0], 'title'));        // Refactoring JavaScript
// console.log(getProperty(getAllBooks()[0], 'markDamaged'));  // undefined
// console.log(getProperty(getAllBooks()[0], 'isbn'));      // error

// Task 05.01
// let ref: ReferenceItem = new ReferenceItem(1, 'Updated Facts and Figures', 2023);
// ref.printItem();
// ref.publisher = 'Random Data Publishing';
// console.log(ref.publisher);
// console.log(ref);
// console.log(ref.getID());

// Task 05.02
// const refBook: ReferenceItem = new Encyclopedia(1, 'WorldPedia', 1900, 10);
// refBook.printItem();

// Task 05.03
// const refBook: ReferenceItem = new Encyclopedia(1, 'WorldPedia', 1900, 10);
// refBook.printCitation();

// Task 05.04
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// favoriteLibrarian.name = 'Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TypeScript');

// Task 05.05
// const personBook: PersonBook = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     author: 'Boris',
//     available: true,
//     category: Category.HTML,
//     id: 1,
//     title: 'Introduction to HTML',
// };
// console.log(personBook);

// let options: TOptions = {};
// options = setDefaultConfig(options);
// console.log(options);


// Task 06.03
// let refBook: ReferenceItem = new Encyclopedia('WorldPedia', 1900, 10);
// let refBook: ReferenceItem = new RefBook(1, 'WorldPedia', 1900, 10);
// refBook.printItem();
// printRefBook(refBook);
// const obj: UL.UniversityLibrarian = new UL.UniversityLibrarian();
// printRefBook(obj); // -- error

// Task 06.05
const flag = true;
if (flag) {
    const module = await import('./classes');

    const reader = new module.Reader();
    console.log(reader);
    reader.name = 'Anna';
    reader.take(getAllBooks()[1]);
}


