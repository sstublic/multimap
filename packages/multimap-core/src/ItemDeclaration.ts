import _ from "lodash";
import { ItemDeclarationModel, FeatureDeclarationValueModel, FeatureDeclarationKey } from "./data-model/ItemDeclarationModel";
import { Feature } from "./abstractions/ItemTypes";

export class ItemDeclaration {
    private declaration: ItemDeclarationModel;

    constructor(declaration: ItemDeclarationModel) {
        this.declaration = declaration;
    }

    public getItemFeatures(): Feature[] {
        const features = _.flatMap(this.declaration, (value, key) => this.expandFeatureDeclaration(value, key));
        return features as Feature[];
    }

    private expandFeatureDeclaration(declarationValue: FeatureDeclarationValueModel, declarationKey: FeatureDeclarationKey): Feature[] {
        if (this.isDeclaredAsClaimValue(declarationValue)) {
            return [{ _type: declarationKey, _value: declarationValue } as Feature];
        }

        if (declarationValue instanceof Array) {
            return _.map(declarationValue as Feature[], value => ({ ...value, _type: declarationKey }));
        }

        return [declarationValue as Feature];
    }

    private isDeclaredAsClaimValue(declarationValueModel: FeatureDeclarationValueModel): boolean {
        if (typeof declarationValueModel === "number") return true;
        if (typeof declarationValueModel === "string") return true;

        if (declarationValueModel instanceof Array
            && (declarationValueModel.length === 0
            || typeof declarationValueModel[0] === "string")) {
            return true;
        }

        return false;
    }
}
