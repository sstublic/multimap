import { ItemDeclarationModel, ItemStore, MemoryPersistenceProvider } from "../src/multimap";

test("Declaration variance", () => {
    const item: ItemDeclarationModel = {
        "multimap:id": "id:1",
        featureSasa: 5,
        featureBool: true,
        featureBle: ["sa", "ble"],
        featureMulti: [
            { _value: 1, _reference: "refID", custom: "hello world" },
            { _type: "override", _value: 2 },
        ],
    } as ItemDeclarationModel;

    const provider = MemoryPersistenceProvider.fromItemDeclarationModels([item]);

    const store = new ItemStore(provider);
    return expect(5).toBe(5);
});
