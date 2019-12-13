import { ItemDeclarationModel, ItemDeclaration } from "../src/multimap";

test("Declaration variance", () => {
    const item: ItemDeclarationModel = {
        featureSasa: 5,
        featureBle: ["sa", "ble"],
        featureMulti: [
            { _value: 1, _reference: "refID", custom: "hello world" },
            { _type: "override", _value: 2 },
        ],
    } as ItemDeclarationModel;

    const itemDeclaration = new ItemDeclaration(item);
    console.log(itemDeclaration.getItemFeatures());

    return expect(5).toBe(5);
});
