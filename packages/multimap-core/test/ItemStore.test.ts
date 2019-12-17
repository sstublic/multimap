import { MemoryPersistenceProvider, ItemStore } from "../src/multimap";

test("Throws on duplicate id", () => {
    const provider = MemoryPersistenceProvider.fromItemDeclarationModels([]);
    const store = new ItemStore(provider);
    store.addItem("123");
    store.addItem("234");
    return expect(() => store.addItem("123")).toThrow("already exists");
});
