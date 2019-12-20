import fs from "fs";
import _ from "lodash";
import { PersistenceProvider } from "../abstractions/PersistenceProvider";
import { Item } from "../abstractions/ItemTypes";
import { ItemDeclarationModel } from "../data-model/ItemDeclarationModel";
import { ItemDeclaration } from "../data-model/ItemDeclaration";

export class FilePersistenceProvider implements PersistenceProvider {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    public load(): Item[] {
        if (!fs.existsSync(this.filePath)) {
            return [];
        }

        const contents = fs.readFileSync(this.filePath);
        const itemDeclarations = JSON.parse(contents.toString()) as ItemDeclarationModel[];
        const items = _.map(itemDeclarations, a => ItemDeclaration.itemFromDeclaration(a));
        return items;
    }

    public save(items: Item[]): void {
        const itemDeclarations = _.map(items, a => ItemDeclaration.declarationFromItem(a));
        const json = JSON.stringify(itemDeclarations, null, 2);
        fs.writeFileSync(this.filePath, json);
    }
}
