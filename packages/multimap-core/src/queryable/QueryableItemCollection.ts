import _ from "lodash";
import { Item } from "../abstractions/ItemTypes";
import { QueryableItem } from "./QueryableItem";

export class QueryableItemCollection {
    private items: Item[];

    constructor(items: Item[]) {
        this.items = items;
    }

    public where(predicate: (item: QueryableItem) => boolean): QueryableItemCollection {
        const filtered = _.filter(this.items, a => predicate(new QueryableItem(a)));
        return new QueryableItemCollection(filtered);
    }

    public select<T>(selector: (item: QueryableItem) => T): Array<T> {
        const selected = _.map(this.items, a => selector(new QueryableItem(a)));
        return selected;
    }

    public count(): number {
        return this.items.length;
    }

    public first(): QueryableItem | undefined {
        return (this.count() < 1)
            ? undefined
            : new QueryableItem(this.items[0]);
    }

    // extension/convenience methods
    public single(): QueryableItem | undefined {
        if (this.count() > 1) {
            throw new Error(`Expected single item in feature collection, but found ${this.count()}.`);
        }
        return this.first();
    }
}
