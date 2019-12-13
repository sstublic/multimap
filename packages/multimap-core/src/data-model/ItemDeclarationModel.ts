import { ClaimValue, Feature } from "../abstractions/ItemTypes";

export type FeatureDeclarationKey = string;
export type FeatureDeclarationValueModel = ClaimValue | Feature | Feature[];

export type ItemDeclarationModel = Record<FeatureDeclarationKey, FeatureDeclarationValueModel>;
