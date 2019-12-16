import _ from "lodash";
import { Item } from "../abstractions/ItemTypes";
import { QueryableFeatureCollection } from "./QueryableFeatureCollection";

export class QueryableItemCollection {
    items: QueryableFeatureCollection[];

    constructor(items: Array<Item | QueryableFeatureCollection>) {
        this.items = _.map(items, a => ((a instanceof QueryableFeatureCollection) ? a : new QueryableFeatureCollection(a)));
    }

    public where(predicate: (item: QueryableFeatureCollection) => boolean): QueryableItemCollection {
        const filtered = _.filter(this.items, a => predicate(a));
        return new QueryableItemCollection(filtered);
    }

    public select<T>(selector: (item: QueryableFeatureCollection) => T): Array<T> {
        const selected = _.map(this.items, a => selector(a));
        return selected;
    }

    public count(): number {
        return this.items.length;
    }

    public first(): QueryableFeatureCollection | null {
        return (this.count() < 1)
            ? null
            : this.items[0];
    }

    // extension/convenience methods
    public single(): QueryableFeatureCollection {
        if (this.count() !== 1) {
            throw new Error(`Expected single item in feature collection, but found ${this.count()}.`);
        }
        return this.first() as QueryableFeatureCollection;
    }
}
