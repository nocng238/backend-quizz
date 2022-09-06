const request = require("../../request");

describe("GET - Check API version", () => {
  test("It should return version", async () => {
    const response = await request.get("/api/v1");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("This is API version 1");
  });
});
