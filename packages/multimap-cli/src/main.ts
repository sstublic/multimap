import fs from "fs";
import { MultiMap } from "@multimap/core";

export default class MainApp {
    public static Run(): void {
        // fs.writeFileSync("test.json", JSON.stringify({ name: "pero" }));
        console.log("App run 8...");
        const map = new MultiMap({ items: [] });
        console.log(map.getItemCount());
    }

    public static Size(str: string): number {
        return str.length + 2;
    }
}

MainApp.Run();
