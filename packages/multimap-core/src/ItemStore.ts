import _ from "lodash";
import { Item } from "./abstractions/ItemTypes";
import { QueryableItemCollection } from "./queryable/QueryableItemCollection";

export class ItemStore {
    private items: Item[];

    constructor(items: Item[]) {
        this.items = items;
        const byKey = _.groupBy(this.query().select(a => a), a => a.id());
        console.log(byKey);
    }

    public query(): QueryableItemCollection {
        return new QueryableItemCollection(this.items);
    }
}
