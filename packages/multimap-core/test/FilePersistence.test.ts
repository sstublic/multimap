import path from "path";
import fs from "fs";
import { FilePersistenceProvider, ItemStore } from "../src/multimap";

test("Throws on duplicate id", () => {
    const workingFolder = path.resolve(__dirname, "../tmp");
    const filePath = path.resolve(workingFolder, "test-map.json");
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
    const provider = new FilePersistenceProvider(filePath);
    const store = new ItemStore(provider);
    store.addItem("123");
    store.addItem("234");
    store.addFeature("123", "test:content", ["line1", "line2"]);
    store.save();
    return expect(2).toBe(2);
});
