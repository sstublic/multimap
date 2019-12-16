import { Feature, ClaimKey, ClaimValue } from "../abstractions/ItemTypes";
import { FeatureClaims } from "../abstractions/FeatureClaims";

export class QueryableFeature {
    private feature: Feature;

    constructor(feature: Feature | QueryableFeature) {
        if (feature instanceof QueryableFeature) {
            this.feature = (feature as QueryableFeature).feature;
        } else {
            this.feature = feature as Feature;
        }
    }

    public claimValue(claimKey: ClaimKey, defaultIfMissing?: ClaimValue): ClaimValue {
        if (this.feature[claimKey] === undefined) {
            if (defaultIfMissing === undefined) {
                throw new Error(`${claimKey} not found on the feature.`);
            }
            return defaultIfMissing;
        }

        const result = this.feature[claimKey];
        if (this.feature[claimKey] instanceof Array) {
            return [...(result as string[])];
        }
        return result;
    }

    public hasClaim(claimKey: ClaimKey, claimValue?: ClaimValue): boolean {
        if (this.feature[claimKey] === undefined) return false;
        const value = this.claimValue(claimKey);

        if (!value) return false;
        if (!claimValue) return true;
        return value === claimValue;
    }

    public type(): string {
        return this.claimValue(FeatureClaims.Type) as string;
    }

    public val(): ClaimValue {
        return this.claimValue(FeatureClaims.Value);
    }
}
