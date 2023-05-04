function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

showHello('greeting', 'TypeScript');

enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular2,
}

function getAllBooks() {
    const books = <const>[
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

function logFirstAvailable(books: readonly any[] = getAllBooks()): void {
    const numberOfBooks: number = books.length;
    const title = books.find(({ available }) => available)?.title;

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`First Available Book: ${title}`);
}

function getBookTitlesByCategory(categoryFilter: Category = Category.JavaScript): Array<string> {
    console.log(`Getting books in category: ${Category[categoryFilter]}`);

    const books = getAllBooks();

    return books
        .filter(({ category }) => category === categoryFilter)
        .map(({ title }) => title);
}

function logBookTitles(titles: string[]): void {
    for (let title of titles) {
        console.log(title);
    }
}

function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index] ?? {};
    return [ title, author ];
}

function calcTotalPages(): bigint {
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

function createCustomerID(name: string, id: number): string {
    return `${name}${id}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Creating customer ${name}`);

    age && console.log(`Age: ${age}`);
    city && console.log(`City: ${city}`);
}

function getBookByID(id: number): any {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Checking out books for ${customer}`);

    let titles: string[] = [];

    bookIDs.forEach(id => {
        const book = getBookByID(id);
        if (book?.available) titles.push(book.title);
    });

    return titles;
}

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

// Task 03.02
// let myID = createCustomerID('Ann', 10);
// console.log(myID);

// the names of parameters are not important
// let idGenerator: (chars: string, num: number) => string;
// idGenerator = (name: string, id: number) => `${name}${id}`;
// idGenerator = createCustomerID;
// myID = idGenerator('Ann', 20);
// console.log(myID);

// Task 03.03

createCustomer('Ann');
createCustomer('Boris', 6);
createCustomer('Clara', 12, 'Atlanta');

const titles = getBookTitlesByCategory();
console.log(titles);

logFirstAvailable();

console.log(getBookByID(1));

const myBooks: string[] = сheckoutBooks('Ann', 1, 3, 4);
console.log(myBooks);
