import _ from "lodash";
import { ClaimValue, ClaimKey, Item } from "../abstractions/ItemTypes";
import { QueryableFeature } from "./QueryableFeature";
import { FeatureClaims } from "../abstractions/FeatureClaims";
import { FeatureTypes } from "../abstractions/FeatureTypes";

export class QueryableItem {
    private item: Item = [];
    private mutated = false;

    constructor(item: Item) {
        this.item = item;
    }

    public findIn(searchItems: Item[]): Item | undefined {
        if (this.mutated) {
            throw new Error("Item has been mutated and can't be matched with original instance.");
        }
        return _.find(searchItems, a => a === this.item);
    }

    public where(predicate: (feature: QueryableFeature) => boolean): QueryableItem {
        const filtered = _.filter(this.item, a => predicate(new QueryableFeature(a)));
        const mutatedQueryableItem = new QueryableItem(filtered);
        mutatedQueryableItem.mutated = true;
        return mutatedQueryableItem;
    }

    public select<T>(selector: (feature: QueryableFeature) => T): Array<T> {
        const selected = _.map(this.item, a => selector(new QueryableFeature(a)));
        return selected;
    }

    public count(): number {
        return this.item.length;
    }

    public first(): QueryableFeature| undefined {
        return (this.count() < 1)
            ? undefined
            : new QueryableFeature(this.item[0]);
    }

    // extension/convenience methods
    public single(): QueryableFeature | undefined {
        if (this.count() > 1) {
            throw new Error(`Expected single item in feature collection, but found ${this.count()}.`);
        }
        return this.first();
    }

    public withClaim(claimKey: ClaimKey, claimValue?: ClaimValue): QueryableItem {
        return this.where(a => a.hasClaim(claimKey, claimValue));
    }

    public ofType(typeClaimValue: ClaimValue): QueryableItem {
        return this.where(a => a.hasClaim(FeatureClaims.Type, typeClaimValue));
    }

    public any(): boolean {
        return this.count() > 0;
    }

    public id(): string {
        const idFeature = this
            .where(a => a.type() === FeatureTypes.MultiMapId)
            .single();

        if (!idFeature) {
            throw new Error(`'${FeatureTypes.MultiMapId}' claim not found on feature.`);
        }
        return idFeature.val() as string;
    }
}
