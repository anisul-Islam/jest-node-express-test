const { addNumbers, subNumbers } = require("../calculator");
const { findUserById } = require("../users");

// testing primitive data types - number, string
describe("calculator functionalities", () => {
  test("adding two numbers", () => {
    const number1 = 20;
    const number2 = 30;
    expect(number1 + number2).toBe(50);
    // expect(number1 + number2).not.toBe(30);
    // expect(number1 + number2).not.toBeLessThan(50);
    // expect(number1 + number2).not.toBeLessThanOrEqual(50);
    // expect(number1 + number2).not.toBeGreaterThan(50);
    // expect(number1 + number2).not.toBeGreaterThanOrEqual(50);
  });
  test("subtraction of two numbers", () => {
    const number1 = 20;
    const number2 = 30;
    expect(number1 - number2).toBe(-10);
  });
  test("multiplication of two numbers", () => {
    const number1 = 20;
    const number2 = 30;
    expect(number1 * number2).toBe(600);
  });
});

describe("variable definistion", () => {
  test("variable should be defined", () => {
    let number = 12;
    expect(number).toBeDefined();
    expect(number).not.toBeNull();
    // expect(number).toBeTruthy();
    // expect(number).toBeFalsy();
    // expect(number).toBeUndefined();
  });
});

describe("string operations", () => {
  const greeting = "Hello, Good Morning. Welcome to testing";
  test("welcome should exist inside the greeting", () => {
    expect(greeting).toMatch(/Welcome/i);
    // expect(greeting).not.toMatch(/Welcome/i);
  });
});

// reference types - array, obejct
describe("reference type operations", () => {
  const users = ["Adam", "Robert", "Linkon"];
  test("the user list does contain Anis", () => {
    users.push("Anis");
    expect(users).toContain("Anis");
    // expect(greeting).not.toMatch(/Welcome/i);
  });

  // test("objects in array", () => {
  //   const products = [
  //     { id: 101, title: "salt" },
  //     { id: 102, title: "sugar" },
  //   ];

  //   expect(products).toContain({ id: 101, title: "salt" });
  //   // expect.arrayContaining([
  //   //   expect.objectContaining({
  //   //     id: expect.any(Number),
  //   //     title: expect.any(String),
  //   //   }),
  //   // ]);
  // });
});
// test function
describe("testing calculator functions", () => {
  test("test addNumbers function", () => {
    expect(addNumbers(3, 5)).toBe(8);
    expect(subNumbers(3, 5)).toBe(-2);
  });
});

// TDD vs BDD
describe("test driven developemnt", () => {
  const users = [
    { id: 101, name: "Alex" },
    { id: 102, name: "Bret lee" },
  ];
  test("find an user by id", () => {
    expect(findUserById(users, 102)).toEqual({ id: 102, name: "Bret lee" });
  });
});

// test api
