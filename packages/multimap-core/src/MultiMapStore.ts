import _ from "lodash";
import { MultiMapItem } from "./multimap";
import { MultiMapItemProperty, PropertyValue } from "./data-model/MultiMapItemProperty";

export class MultiMapStore {
    private items: MultiMapItem[] = [];

    public addItems(items: MultiMapItem[]): void {
        this.items = this.items.concat(items);
    }

    public enumerateProperties(): object[] {
        const result = _.flatMap(this.items, value => this.enumeratePropertiesForItem(value));

        return result;
    }

    private enumeratePropertiesForItem(item: MultiMapItem): object[] {
        const result = _.flatMap(item, (value, key) => this.expandSingleProperty(value, key));
        return [];
    }

    private expandSingleProperty(propertyValue: PropertyValue | MultiMapItemProperty | MultiMapItemProperty[], key: string): object[] {
        if (propertyValue instanceof Array) {
            console.log("is array");
        }
        console.log(key, propertyValue);
        return [];
    }
}
