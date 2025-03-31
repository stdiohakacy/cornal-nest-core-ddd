export abstract class WatchedList<T> {
  private currentItemsSet: Set<T>;
  private initialSet: Set<T>;
  private newSet: Set<T>;
  private removedSet: Set<T>;

  constructor(initialItems: T[]) {
    this.currentItemsSet = new Set(initialItems || []);
    this.initialSet = new Set(initialItems || []);
    this.newSet = new Set();
    this.removedSet = new Set();
  }

  abstract compareItems(a: T, b: T): boolean;

  public getItems(): T[] {
    return Array.from(this.currentItemsSet);
  }

  public getNewItems(): T[] {
    return Array.from(this.newSet);
  }

  public getRemovedItems(): T[] {
    return Array.from(this.removedSet);
  }

  public exists(item: T): boolean {
    return this.currentItemsSet.has(item);
  }

  public add(item: T): void {
    if (this.removedSet.has(item)) {
      this.removedSet.delete(item);
    }

    if (!this.newSet.has(item) && !this.initialSet.has(item)) {
      this.newSet.add(item);
    }

    if (!this.currentItemsSet.has(item)) {
      this.currentItemsSet.add(item);
    }
  }

  public remove(item: T): void {
    this.currentItemsSet.delete(item);

    if (this.newSet.has(item)) {
      this.newSet.delete(item);
      return;
    }

    if (!this.removedSet.has(item)) {
      this.removedSet.add(item);
    }
  }
}
