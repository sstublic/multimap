import _ from "lodash";
import * as React from "react";
import { LocalStoragePersistenceProvider } from "../services/LocalStoragePersistenceProvider";
import { ItemStore } from "@multimap/core";

export default class StorageDemo extends React.Component<{}, {data: string[] }> {
    state: { data: string[] } = { data: [] };

    constructor(props: {}) {
        super(props);
        this.state = { data: this.getItems() };
        this.onClick = this.onClick.bind(this);
    }

    private onClick(event: React.MouseEvent<HTMLButtonElement>): void {
        const store = this.getStore();
        const id = store.createValidId("test item");
        store.addItem(id);
        store.save();
        this.setState({ data: this.getItems() });
    }

    public render() {
        var itemList = _.map(this.state.data, a => <div key={a}>{a}</div>);
        return  (
            <div>
                <h1>HELLO from StorageDemo</h1>
                <button onClick={this.onClick}>Click me!</button>
                <div>{itemList}</div>
            </div>
        );
    }

    private getItems(): string[] {
        var ids = this.getStore().query().select(a => a.id());
        return ids;
    }

    private getStore(): ItemStore {
        const localStorage = new LocalStoragePersistenceProvider("test");
        const store = new ItemStore(localStorage);
        return store;
    }
}
