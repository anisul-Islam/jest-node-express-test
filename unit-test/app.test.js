const request = require("supertest");
const app = require("../app");

// beforeAll(() => {
//   console.log("beforeAll running");
// });
// // beforeEach()
// // afterEach()
// afterAll(() => {
//   console.log("afterAll running");
// });

describe("test post method for /users", () => {
  test("should specifiy json in the content-type header", async () => {
    const response = await request(app)
      .post("/users")
      .send({ username: "test", password: "123" });
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });

  test("should respond 200 if username, password exists", async () => {
    const response = await request(app)
      .post("/users")
      .send({ username: "test", password: "123" });
    expect(response.statusCode).toBe(200);
  });

  test("should respond 400 if username,password is missing", async () => {
    const userData = [{ username: "test" }, { password: "123" }, {}];

    for (const user of userData) {
      const response = await request(app).post("/users").send(user);
      expect(response.statusCode).toBe(400);
    }
  });

  // test("should respond 400 if username is missing", async () => {
  //   const response = await request(app)
  //     .post("/users")
  //     .send({ password: "123" });
  //   expect(response.statusCode).toBe(400);
  // });

  // test("should respond 400 if password is missing", async () => {
  //   const response = await request(app)
  //     .post("/users")
  //     .send({ username: "test" });
  //   expect(response.statusCode).toBe(400);
  // });

  // test("should respond 400 if username and password is missing", async () => {
  //   const response = await request(app).post("/users").send();
  //   expect(response.statusCode).toBe(400);
  // });

  test("should return userID if user is created", async () => {
    const response = await request(app)
      .post("/users")
      .send({ username: "test", password: "123" });
    expect(response.body.username).toBeDefined();
  });
});
