import { MemoryPersistenceProvider, ItemStore } from "../src/multimap";

test("Throws on duplicate id", () => {
    const provider = MemoryPersistenceProvider.fromItemDeclarationModels([]);
    const store = new ItemStore(provider);
    store.createNewItem("123");
    store.createNewItem("234");
    return expect(() => store.createNewItem("123")).toThrow("id already exists");
});
