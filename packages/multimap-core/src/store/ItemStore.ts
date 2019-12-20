import _ from "lodash";
import { Item, Feature, ClaimValue, ClaimKey } from "../abstractions/ItemTypes";
import { QueryableItemCollection } from "../queryable/QueryableItemCollection";
import { PersistenceProvider } from "../abstractions/IPersistenceProvider";
import { FeatureClaims } from "../abstractions/FeatureClaims";
import { FeatureTypes } from "../abstractions/FeatureTypes";
import { QueryableItem } from "../queryable/QueryableItem";
import { QueryableFeature } from "../queryable/QueryableFeature";

export class ItemStore {
    private items: Item[] = [];
    private persistenceProvider: PersistenceProvider;

    constructor(persistenceProvider: PersistenceProvider) {
        this.persistenceProvider = persistenceProvider;
        this.load();
    }
 
    public addItem(itemId: string): QueryableItem {
        if (this.findItem(itemId)) {
            throw new Error(`Item with id ${itemId} already exists.`);
        }
        const newItem: Item = [];
        const idFeature = this.createFeature(FeatureTypes.MultiMapId, itemId);
        newItem.push(idFeature);
        this.items.push(newItem);
        return new QueryableItem(newItem);
    }

    public removeItemById(itemId: string): void {
        const item = this.findItem(itemId);
        if (!item) {
            throw new Error(`Item with id '${itemId}' not found.`);
        }
        this.removeItem(item);
    }

    public removeItem(queryableItem: QueryableItem): void {
        const itemInstance = queryableItem.findInRequired(this.items);
        _.remove(this.items, a => a === itemInstance);
    }

    public addFeature(itemId: string, type: ClaimKey, value: ClaimValue): QueryableFeature {
        const item = this.findItem(itemId);
        if (!item) {
            throw new Error(`Item with id '${itemId}' was not found.`);
        }

        const itemInstance = item.findIn(this.items);
        if (!itemInstance) {
            throw new Error("Unexpected non-matched instance.");
        }
        const newFeature = this.createFeature(type, value);
        itemInstance.push(newFeature);
        return new QueryableFeature(newFeature);
    }

    public removeFeature(queryableItem: QueryableItem, queryableFeature: QueryableFeature): void {
        const itemInstance = queryableItem.findInRequired(this.items);
        const featureInstance = queryableFeature.findInRequired(itemInstance);
        _.remove(itemInstance, a => a === featureInstance);
    }

    public findItem(itemId: string): QueryableItem | undefined {
        const item = this.query()
            .where(a => a.id() === itemId)
            .single();
        return item;
    }

    public load(): void {
        this.initializeWithItems(this.persistenceProvider.load());
    }

    public save(): void {
        this.persistenceProvider.save(this.items);
        this.load();
    }
    
    public query(): QueryableItemCollection {
        return new QueryableItemCollection(this.items);
    }

    public createValidId(semanticName: string): string {
        const regex = /([^a-z0-9\s]|\s+)/gm;
        const newIdBase = semanticName
            .toLowerCase()
            .trim()
            .replace(regex, "_");

        const allIds = new Set(this.query().select(a => a.id()));
        
        let postfix = 1;
        let candidate = newIdBase;

        while (allIds.has(candidate)) {
            candidate = `${newIdBase}_${postfix}`;
            postfix++;
        }
        
        return candidate;
    }

    private initializeWithItems(items: Item[]): void {
        this.items = items;
    }

    private createFeature(type: ClaimKey, value: ClaimValue): Feature {
        const feature: Feature = {};
        feature[FeatureClaims.Type] = type;
        feature[FeatureClaims.Value] = value;
        return feature;
    }
}
