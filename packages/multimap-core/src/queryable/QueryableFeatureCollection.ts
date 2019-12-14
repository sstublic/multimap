import _ from "lodash";
import { Feature, FeatureTypeClaimKey, ClaimValue, ClaimKey } from "../abstractions/ItemTypes";

export class QueryableFeatureCollection {
    private features: Feature[];

    constructor(features: Feature[]) {
        this.features = features;
    }

    public withClaim(claimKey: ClaimKey, claimValue: ClaimValue): QueryableFeatureCollection {
        const filtered = _.filter(this.features, a => {
            if (claimValue) {
                return a[claimKey] === claimValue;
            }
            return a[claimKey] !== undefined;
        });
        return new QueryableFeatureCollection(filtered);
    }

    public ofType(typeClaimValue: ClaimValue): QueryableFeatureCollection {
        return this.withClaim(FeatureTypeClaimKey, typeClaimValue);
    }

    public any(): boolean {
        return this.features.length > 0;
    }

    public single(): Feature {
        if (this.features.length !== 1) {
            throw new Error(`Expected single item in feature collection, but found ${this.features.length}.`);
        }
        return this.features[0];
    }
}
