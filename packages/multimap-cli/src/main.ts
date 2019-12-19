export default class MainApp {
    public static Run(x: string): void {
        // fs.writeFileSync("test.json", JSON.stringify({ name: "pero" }));
        console.log("App run 8...");
        import(x).then(a => {
            console.log(a);
            const p = new a.BlebliClass();
            p.run();
        });
    }

    public static Size(str: string): number {
        return str.length + 2;
    }
}

MainApp.Run("./blebli");
