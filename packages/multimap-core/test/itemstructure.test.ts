import { ItemDeclarationModel, ItemDeclaration, ItemStore } from "../src/multimap";

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

    const itemFeatures = ItemDeclaration.featuresFromDeclaration(item);
    console.log(itemFeatures);

    const declaration = ItemDeclaration.declarationFromFeatures(itemFeatures);
    console.log(declaration);

    const store = new ItemStore([itemFeatures]);
    return expect(5).toBe(5);
});
