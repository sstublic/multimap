import { Item, Feature, ClaimValue, ClaimKey } from "../abstractions/ItemTypes";
import { QueryableItemCollection } from "../queryable/QueryableItemCollection";
import { PersistenceProvider } from "../abstractions/IPersistenceProvider";
import { FeatureClaims } from "../abstractions/FeatureClaims";
import { FeatureTypes } from "../abstractions/FeatureTypes";
import { QueryableItem } from "../queryable/QueryableItem";

export class ItemStore {
    private items: Item[] = [];
    private persistenceProvider: PersistenceProvider;

    constructor(persistenceProvider: PersistenceProvider) {
        this.persistenceProvider = persistenceProvider;
        this.load();
    }
 
    private initializeWithItems(items: Item[]): void {
        this.items = items;
    }

    public createNewItem(itemId: string): void {
        if (this.findById(itemId)) {
            throw new Error("Item with same id already exists.");
        }
        const newItem: Item = [];
        const idFeature = this.createFeature(FeatureTypes.MultiMapId, itemId);
        newItem.push(idFeature);
        this.items.push(newItem);
    }

    public addFeature(itemId: string, type: ClaimKey, value: ClaimValue): void {
        const item = this.findById(itemId);
        if (!item) {
            throw new Error(`Item with id '${itemId}' was not found.`);
        }

        const itemInstance = item.findIn(this.items);
        if (!itemInstance) {
            throw new Error("Unexpected non-matched instance.");
        }
        itemInstance.push(this.createFeature(type, value));
    }

    public findById(itemId: string): QueryableItem | undefined {
        const item = this.query()
            .where(a => a.id() === itemId)
            .single();
        return item;
    }

    private createFeature(type: ClaimKey, value: ClaimValue): Feature {
        const feature: Feature = {};
        feature[FeatureClaims.Type] = type;
        feature[FeatureClaims.Value] = value;
        return feature;
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
}
