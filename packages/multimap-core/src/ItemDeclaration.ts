import _ from "lodash";
import { ItemDeclarationModel, FeatureDeclarationValueModel, FeatureDeclarationKey } from "./data-model/ItemDeclarationModel";
import { Feature } from "./abstractions/ItemTypes";
import { FeatureClaims } from "./abstractions/FeatureClaims";

export class ItemDeclaration {
    public static featuresFromDeclaration(itemDeclarationModel: ItemDeclarationModel): Feature[] {
        const features = _.flatMap(itemDeclarationModel, (value, key) => this.expandFeatureDeclaration(value, key));
        return features as Feature[];
    }

    public static declarationFromFeatures(features: Feature[]): ItemDeclarationModel {
        const featuresByType = _.groupBy(features, a => a[FeatureClaims.Type]);
        const declarationModel = _.mapValues(featuresByType, value => this.createFeatureDeclarationValueModel(value));
        return declarationModel;
    }

    private static createFeatureDeclarationValueModel(features: Feature[]): FeatureDeclarationValueModel {
        if (features.length === 1) {
            if (this.isFeatureWithValueOnly(features[0])) {
                return features[0][FeatureClaims.Value];
            }
            return this.cloneFeatureExcludeType(features[0]);
        }

        const allFeaturesWithoutType = _.map(features, a => this.cloneFeatureExcludeType(a));
        return allFeaturesWithoutType;
    }

    private static cloneFeatureExcludeType(feature: Feature): Feature {
        const featureWithoutType = { ...feature };
        delete featureWithoutType[FeatureClaims.Type];
        return featureWithoutType;
    }

    private static isFeatureWithValueOnly(feature: Feature): boolean {
        return _.every(feature, (value, key) => key === FeatureClaims.Type || key === FeatureClaims.Value);
    }

    private static expandFeatureDeclaration(declarationValue: FeatureDeclarationValueModel, declarationKey: FeatureDeclarationKey): Feature[] {
        if (this.isDeclaredAsClaimValue(declarationValue)) {
            return [{ _type: declarationKey, _value: declarationValue } as Feature];
        }

        if (declarationValue instanceof Array) {
            return _.map(declarationValue as Feature[], value => {
                const feature = { ...value };
                feature[FeatureClaims.Type] = declarationKey;
                return feature;
            });
        }

        return [declarationValue as Feature];
    }

    private static isDeclaredAsClaimValue(declarationValueModel: FeatureDeclarationValueModel): boolean {
        if (typeof declarationValueModel === "number"
            || typeof declarationValueModel === "string"
            || typeof declarationValueModel === "boolean") {
            return true;
        }

        if (declarationValueModel instanceof Array
            && (declarationValueModel.length === 0
            || typeof declarationValueModel[0] === "string")) {
            return true;
        }

        return false;
    }
}
