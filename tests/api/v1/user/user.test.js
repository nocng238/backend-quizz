const mongoose = require("mongoose");

const request = require("../../../request");

describe("GET - Check GET with pagination", () => {
  test("Users are returned as json", async () => {
    await request
      .get("/api/v1/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("There are totally 17 users that have deleted_at !== null", async () => {
    const response = await request.get("/api/v1/users");
    expect(response.body.total).toBe(17);
  });

  test("Only first 10 documents when get user", async () => {
    const response = await request.get("/api/v1/users");
    expect(response.body.users).toHaveLength(10);
  });

  test("No documents at page 99", async () => {
    const response = await request.get("/api/v1/users?page=99");
    expect(response.body.users).toHaveLength(0);
  });
});

describe("GET - Check GET with status and/or search", () => {
  test("Only document that have active status can be get", async () => {
    const response = await request.get("/api/v1/users?status=active");
    const users = response.body.users;

    const statusUsers = users.map((user) => user.status);
    expect(statusUsers.includes("inactive")).toBe(false);
  });

  test("Only document that its name or email includes 'son' can be get", async () => {
    const response = await request.get("/api/v1/users?search=son");
    const users = response.body.users;

    const nameUsers = users.map((user) => user.name);
    const emailUsers = users.map((user) => user.email);

    expect(
      nameUsers.every((name) => name.includes("son")) ||
        emailUsers.every((email) => email.includes("son"))
    ).toBe(true);
  });

  test("Only document that its name or email includes 'son@gmail.com' can be get", async () => {
    const response = await request.get("/api/v1/users?search=son");
    const users = response.body.users;

    const emailUsers = users.map((user) => user.email);
    const nameUsers = users.map((user) => user.name);

    expect(
      nameUsers.every((name) => name.includes("son@gmail.com")) ||
        emailUsers.every((email) => email.includes("son@gmail.com"))
    ).toBe(true);
  });

  test("No document that its name and email includes 'abcxyz'", async () => {
    const response = await request.get("/api/v1/users?search=abcxyz");

    expect(response.body.users).toHaveLength(0);
  });

  test("Only document that its name or email includes 'son' and status is active can be get", async () => {
    const response = await request.get(
      "/api/v1/users?status=active&search=son"
    );
    const users = response.body.users;

    const statusUsers = users.map((user) => user.status);
    const nameUsers = users.map((user) => user.name);
    const emailUsers = users.map((user) => user.email);

    expect(statusUsers.includes("inactive")).toBe(false);
    expect(
      nameUsers.every((name) => name.includes("son")) ||
        emailUsers.every((email) => email.includes("son"))
    ).toBe(true);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
