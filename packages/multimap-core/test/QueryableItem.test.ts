import { QueryableItem } from "../src/queryable/QueryableItem";
import { ItemDeclaration } from "../src/multimap";
import { Item } from "../src/abstractions/ItemTypes";

test("findIn finds and throws on mutated", () => {
    const item = ItemDeclaration.itemFromDeclaration({
        testvalue: 10,
    });

    const queryableItem = new QueryableItem(item);
    expect(queryableItem.findIn([])).toBeUndefined();
    expect(queryableItem.findIn([{} as Item, item, {} as Item])).toBe(item);

    const mutatedQueryable = queryableItem.where(a => a.type() === "testvalue");
    expect(mutatedQueryable.count()).toBe(1);
    expect(() => mutatedQueryable.findIn([])).toThrow("has been mutated");
});
