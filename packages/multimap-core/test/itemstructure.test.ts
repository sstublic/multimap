import { MultiMapItem, MultiMapStore } from "../src/multimap";

test("Declaration variance", () => {
    const store = new MultiMapStore();
    const item: MultiMapItem = {
        ble: ["sa", "ble"],
    } as MultiMapItem;

    store.addItems([item]);
    store.enumerateProperties();
});
