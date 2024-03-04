export class Stack<T> {
    private items: Array<T> = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): any {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items.pop();
    }

    peek(): any {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }
}