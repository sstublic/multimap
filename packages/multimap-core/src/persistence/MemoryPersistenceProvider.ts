import _ from "lodash";
import { PersistenceProvider } from "../abstractions/PersistenceProvider";
import { ItemDeclarationModel } from "../data-model/ItemDeclarationModel";
import { ItemDeclaration } from "../data-model/ItemDeclaration";
import { Item } from "../abstractions/ItemTypes";

export class MemoryPersistenceProvider implements PersistenceProvider {
    items: Item[];
    
    constructor(items: Item[]) {
        this.items = items;
    }

    public static fromItems(items: Item[]): MemoryPersistenceProvider {
        return new MemoryPersistenceProvider(items);
    }

    public static fromItemDeclarationModels(itemDeclarationModels: ItemDeclarationModel[]): MemoryPersistenceProvider {
        const items = _.map(itemDeclarationModels, a => ItemDeclaration.itemFromDeclaration(a));
        return new MemoryPersistenceProvider(items);
    }

    public load(): Item[] {
        return [...this.items];
    }

    public save(items: Item[]): void {
        this.items = items;
    }
}
