import _ from "lodash";
import { MultiMapItem } from "./data-model/MultiMapItem";

export class MultiMapParser {
    public static enumerateProperties(multiMapItem: MultiMapItem): any[] {
        const result = _.map(multiMapItem, (a, b) => a);
        return result;
    }
}
