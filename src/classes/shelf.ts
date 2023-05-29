export default class Shelf<T> {
    private items: Array<T> = new Array<T>();

    add(item: T): void {
        this.items.push(item);
    }

    getFirst(): T {
        return this.items[0];
    }
}
