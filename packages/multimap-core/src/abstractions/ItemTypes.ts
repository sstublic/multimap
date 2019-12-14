export type ClaimKey = string;
export type ClaimValue = string | string[] | number | boolean;
export type Feature = Record<ClaimKey, ClaimValue>;

export const FeatureTypeClaimName = "_type";
export const FeatureValueClaimName = "_value";
