import { ShelfItem } from './../interfaces';

export default class Shelf<T extends ShelfItem> {
    private items: Array<T> = new Array<T>();

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }

    find(title: string): T {
        return this.items.filter(item => item.title === title)[0];
    }

    printTitles(): void {
        this.items.forEach(item => console.log(item.title));
    }
}
