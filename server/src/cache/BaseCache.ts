export default abstract class BaseCache<T> {
    constructor(private data: T[] = []) {}

    has(data: T) {
        return this.data.includes(data);
    }

    add(data: T) {
        if (!this.has(data)) {
            this.data.push(data);
        }
    }

    remove(data: T) {
        if (this.has(data)) {
            this.data.splice(
                this.data.findIndex(x => x === data),
                1
            );
        }
    }

    abstract check(data: T): void;
}
