import { MultiMapItemProperty, PropertyValue } from "./MultiMapItemProperty";

export interface MultiMapItem extends Record<string, PropertyValue | MultiMapItemProperty | MultiMapItemProperty[]> {
}
