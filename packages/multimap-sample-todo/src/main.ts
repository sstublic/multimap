import _ from "lodash";
import { ItemStore, FilePersistenceProvider } from "@multimap/core";

export class ToDo {
    public static run(): void {
        const args = _.drop(process.argv, 2);
        const command = args[0];
        const commandArgs = _.drop(args, 1);
        if (!command) {
            console.log("Expected command to run.");
        } else if (command === "add") {
            this.add(commandArgs);
        } else if (command === "list") {
            this.list(commandArgs);
        } else if (command === "edit") {
            this.edit(commandArgs);
        } else {
            console.log(`Unknown command '${command}'.`);
        }
    }

    public static add(args: string[]): void {
        const list = args[0] ?? "Default list";
        const title = args[1] ?? "Untitled item";

        const store = this.getStore();
        const id = store.createValidId(title);
        store.addItem(id);
        store.addFeature(id, "sample-todo:list", list);
        store.addFeature(id, "sample-todo:title", title);
        store.save();
        console.log(`Added item '${title}' to '${list}' with id '${id}'.`);
    }

    public static list(args: string[]): void {
        const list = args[0];
        const store = this.getStore();
        let items = store.query();

        if (list) {
            items = items
                .where(a => a.ofType("sample-todo:list").single()?.val() === list);
        }

        const result = items
            .select(a => ({
                id: a.id(),
                list: a.ofType("sample-todo:list").single()?.val() as string,
                title: a.ofType("sample-todo:title").single()?.val() as string,
            }));
        
        const byList = _.groupBy(result, a => a.list);
        _.forEach(byList, (a, listName) => this.displayItem(listName, a));
    }

    public static edit(args: string[]): void {
        const editorPackageName = "tiny-cli-editor";
        import(editorPackageName).then(editor => {
            console.log(editor.default);
            editor.default("");
        });
    }

    static displayItem(list: string, items: { id: string; list: string; title: string }[]): void {
        console.log(list);
        console.log("=========================");
        _.forEach(items, a => console.log(`[${a.id}] ${a.title}`));
        console.log("");
    }

    private static getStore(): ItemStore {
        const fileProvider = new FilePersistenceProvider("default.multimap.json");
        const store = new ItemStore(fileProvider);
        return store;
    }
}

ToDo.run();
