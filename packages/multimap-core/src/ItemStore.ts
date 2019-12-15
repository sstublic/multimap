import _ from "lodash";
import { Feature } from "./abstractions/ItemTypes";
import { QueryableFeatureCollection } from "./queryable/QueryableFeatureCollection";

export class ItemStore {
    private itemsFeatures: Feature[][];

    constructor(itemsFeatures: Feature[][]) {
        const byKey = _.mapKeys(itemsFeatures, a => new QueryableFeatureCollection(a)
            .ofType("multimap:id")
            .single()
            .val());
        console.log(byKey);
        this.itemsFeatures = itemsFeatures;
    }
}