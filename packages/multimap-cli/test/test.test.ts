import { MultiMap } from "@multimap/core";

test("Jest demo test", () => expect(5).toBe(5));

test("Complex test", () => {
    if ("ble".length === 3) return expect(3).toBe(3);
    return undefined;
});

test("Props count", () => {
    const obj = { items: [{ sasa: [{ value: "10" }], "pero:e": [{ value: "2" }] }] };
    const map = new MultiMap(obj);
    return expect(map.getItemCount()).toBe(1);
});
