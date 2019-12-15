export type ClaimKey = string;
export type ClaimValue = string | string[] | number | boolean;
export type Feature = Record<ClaimKey, ClaimValue>;

export enum FeatureClaims {
    Type = "_type",
    Value = "_value"
}
