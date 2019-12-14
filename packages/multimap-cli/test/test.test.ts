test("Jest demo test", () => expect(5).toBe(5));

test("Complex test", () => {
    if ("ble".length === 3) return expect(3).toBe(3);
    return undefined;
});

test("Props count", () => {
    return expect(1).toBe(1);
});
