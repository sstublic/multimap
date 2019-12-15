import _ from "lodash";
import { Feature, ClaimValue, ClaimKey, FeatureClaims } from "../abstractions/ItemTypes";
import { QueryableFeature } from "./QueryableFeature";

export class QueryableFeatureCollection {
    private features: QueryableFeature[] = [];

    constructor(features: Array<Feature | QueryableFeature>) {
        this.features = _.map(features, a => new QueryableFeature(a));
    }

    public where(predicate: (feature: QueryableFeature) => boolean): QueryableFeatureCollection {
        const filtered = _.filter(this.features, a => predicate(a));
        return new QueryableFeatureCollection(filtered);
    }

    public select<T>(selector: (feature: QueryableFeature) => T): Array<T> {
        const selected = _.map(this.features, a => selector(a));
        return selected;
    }

    public count(): number {
        return this.features.length;
    }

    public single(): QueryableFeature {
        if (this.count() !== 1) {
            throw new Error(`Expected single item in feature collection, but found ${this.features.length}.`);
        }
        return this.features[0];
    }

    // extension/convenience methods
    public withClaim(claimKey: ClaimKey, claimValue?: ClaimValue): QueryableFeatureCollection {
        return this.where(a => a.hasClaim(claimKey, claimValue));
    }

    public ofType(typeClaimValue: ClaimValue): QueryableFeatureCollection {
        return this.where(a => a.hasClaim(FeatureClaims.Type, typeClaimValue));
    }

    public any(): boolean {
        return this.count() > 0;
    }
}
