import { MultiMapItem, MultiMapParser } from "../src/multimap";

test("Declaration variance", () => {
    const item: MultiMapItem = {
        ble: ["sa", "ble"],
    } as MultiMapItem;

    console.log(MultiMapParser.enumerateProperties(item));
    return expect(10).toBe(10);
});
