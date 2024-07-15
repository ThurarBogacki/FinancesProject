const connection = require("./dbConfig");

test("Connecting Database", async () => {
  expect(connection).toBeTruthy();
});
