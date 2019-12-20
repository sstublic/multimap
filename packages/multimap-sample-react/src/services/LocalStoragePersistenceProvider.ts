import _ from "lodash";
import { PersistenceProvider, ItemDeclarationModel, ItemDeclaration } from "@multimap/core";
import { Item } from "@multimap/core/dist/abstractions/ItemTypes";

export class LocalStoragePersistenceProvider implements PersistenceProvider {
    private mapName: string;
    private mapKey: string;

    constructor(mapName: string) {
        this.mapName = mapName;
        this.mapKey = `multimap:file:${this.mapName}`;
    }

    public load(): Item[] {
        const contents = localStorage.getItem(this.mapKey);
        if (!contents) {
            return [];
        }
        
        const itemDeclarations = JSON.parse(contents.toString()) as ItemDeclarationModel[];
        const items = _.map(itemDeclarations, a => ItemDeclaration.itemFromDeclaration(a));
        return items;
    }

    public save(items: Item[]): void {
        const itemDeclarations = _.map(items, a => ItemDeclaration.declarationFromItem(a));
        const json = JSON.stringify(itemDeclarations, null, 2);
        localStorage.setItem(this.mapKey, json);
    }
}
