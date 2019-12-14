export type ClaimKey = string;
export type ClaimValue = string | string[] | number | boolean;
export type Feature = Record<ClaimKey, ClaimValue>;

export const FeatureTypeClaimKey = "_type";
export const FeatureValueClaimKey = "_value";
