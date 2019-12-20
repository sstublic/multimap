import { performance } from "perf_hooks";
import { MemoryPersistenceProvider, ItemStore } from "../src/multimap";

function newStore(): ItemStore {
    const provider = MemoryPersistenceProvider.fromItemDeclarationModels([]);
    const store = new ItemStore(provider);
    return store;
}

test("Throws on duplicate id", () => {
    const store = newStore();
    store.addItem("123");
    store.addItem("234");
    return expect(() => store.addItem("123")).toThrow("already exists");
});

test("Correct id token replacement", () => {
    const store = newStore();
    expect(store.createValidId("Saša Stublić   ")).toBe("sa_a_stubli_");
    expect(store.createValidId("Important things to do")).toBe("important_things_to_do");
});

test("Correct id on duplicate", () => {
    const store = newStore();
    const name = "test item";
    store.addItem(store.createValidId(name));

    const item1 = store.addItem(store.createValidId(name));
    expect(item1.id()).toBe("test_item_1");
    
    const item2 = store.addItem(store.createValidId(name));
    expect(item2.id()).toBe("test_item_2");
});

test("Id creation performance", () => {
    const store = newStore();
    const name = "Test longer item name to test for performance with larger string.";
    const iterations = 100;

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        const id = store.createValidId(name);
        store.addItem(id);
    }
    const elapsed = performance.now() - start;
    const perItem = elapsed / iterations;
    console.log(`Time for ${iterations} iterations: ${elapsed} ms. Average per item: ${perItem} ms.`);
    return expect(perItem).toBeLessThan(5);
});
