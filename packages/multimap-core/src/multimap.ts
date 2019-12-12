import _ from "lodash";
import { MultiMapStore } from "./data-model/MultiMapStore";

export { MultiMapItem } from "./data-model/MultiMapItem";
export { MultiMapParser } from "./MultiMapParser";

export class MultiMap {
    private multiMapStore: MultiMapStore;

    public constructor(multiMapStore: MultiMapStore) {
        this.multiMapStore = multiMapStore;
    }

    public getItemCount(): number {
        return this.multiMapStore.items.length;
    }

    public test(): void {
        const msg = `pero ${this.multiMapStore.items.length.toString()}`;
        console.log(msg);
    }
}
