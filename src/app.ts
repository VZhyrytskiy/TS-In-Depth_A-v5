showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt!.innerText = `Hello from ${name}`;
}

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

function logFirstAvailable(books: readonly any[]): void {
    const numberOfBooks: number = books.length;
    const title = books.find(({ available }) => available)?.title;

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`First Available Book: ${title}`);
}

function getBookTitlesByCategory(categoryFilter: Category): Array<string> {
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

// ---------------------------------------------
// Task 02.01
console.log(getAllBooks());

const allBooks = getAllBooks();
logFirstAvailable(allBooks);

const javaScriptBooks = getBookTitlesByCategory(Category.JavaScript);
logBookTitles(javaScriptBooks);

const titleAndAuthor = getBookAuthorByIndex(2);
console.log(titleAndAuthor);

console.log(calcTotalPages());
