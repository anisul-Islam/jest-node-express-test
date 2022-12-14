const express = require("express");
const request = require("supertest");

const userRoute = require("../routes/user");

const app = express();

app.use(express.json());

app.use("/api/users", userRoute);

jest.mock("../data/users.json", () => [
  { id: 1, name: "Alex", age: 32 },
  { id: 2, name: "Robert", age: 31 },
]);

describe("user api testing", () => {
  test("GET /api/users - get all the users", async () => {
    const { body, statusCode } = await request(app).get("/api/users");
    expect(body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          age: expect.any(Number),
        }),
      ])
    );
    expect(statusCode).toBe(200);
  });

  test("POST /api/users - do not create user for invalid input", async () => {
    const { body, statusCode } = await request(app).post("/api/users").send({
      name: "",
      age: 32,
    });
    expect(statusCode).toBe(400);
    expect(body).toEqual({
      error: "name or age is missing",
    });
  });

  test("POST /api/users - create an user for valid input", async () => {
    const { body, statusCode } = await request(app).post("/api/users").send({
      name: "Milton",
      age: 32,
    });
    expect(statusCode).toBe(201);
    expect(body).toEqual({ message: "user was created " });
  });

  test("PUT /api/users/:id - could not update user when id was not found", async () => {
    const { body, statusCode } = await request(app).put("/api/users/3").send({
      name: "Milton",
      age: 32,
    });
    expect(statusCode).toBe(404);
    expect(body).toEqual({
      error: "no user found with this id",
    });
  });

  test("PUT /api/users/:id - update user successfully", async () => {
    const { body, statusCode } = await request(app).put("/api/users/2").send({
      name: "test",
      age: 299,
    });

    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: "user was updated " });
  });

  test("DELETE /api/users/:id - could not delete user when id was not found", async () => {
    const { body, statusCode } = await request(app).delete("/api/users/3");
    expect(statusCode).toBe(404);
    expect(body).toEqual({
      success: false,
      error: "no user found with this id",
    });
  });

  test("DELETE /api/users/:id - delete user successfully", async () => {
    const { body, statusCode } = await request(app).delete("/api/users/2");

    expect(statusCode).toBe(200);
    expect(body).toEqual({ message: "user was deleted " });
  });
});

const baseUrl = "https://jsonplaceholder.typicode.com/";
describe("test todo api", () => {
  test("should return todo with status code 200", async () => {
    const { body, statusCode } = await request(baseUrl).get("todos/1");
    expect(body).toEqual(
      expect.objectContaining({
        userId: expect.any(Number),
        id: expect.any(Number),
        title: expect.any(String),
        completed: expect.any(Boolean),
      })
    );
    expect(statusCode).toBe(200);
  });
});
