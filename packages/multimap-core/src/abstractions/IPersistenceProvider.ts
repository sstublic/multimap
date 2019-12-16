import { Item } from "./ItemTypes";

export interface PersistenceProvider {
    load(): Item[];
    save(items: Item[]): void;
}
