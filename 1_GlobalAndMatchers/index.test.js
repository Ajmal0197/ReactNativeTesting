/**
 * GLOBAL MATCHERS AND CUSTOM MATCHERS:
 * Jest provides a set of built-in global matchers to assert various conditions in your tests. These matchers are used to compare expected and actual values, making it easier to write assertions in your test cases.
 *
 * - **Global Matchers**: These are built-in methods that Jest provides for common assertions. They include:
 *   - `toBe(value)`: Checks for strict equality (using `===`).
 *   - `toEqual(value)`: Checks for deep equality, useful for comparing objects and arrays.
 *   - `toBeNull()`: Asserts that the value is `null`.
 *   - `toBeDefined()`: Asserts that the value is not `undefined`.
 *   - `toBeFalsy()`: Asserts that the value is falsy (i.e., evaluates to `false` in a boolean context).
 *   - `toBeTruthy()`: Asserts that the value is truthy (i.e., evaluates to `true` in a boolean context).
 *   - `toContain(item)`: Checks if an array or iterable contains a specific item.
 *   - `toMatch(regex)`: Checks if a string matches a regular expression.
 *   - `toThrow(error)`: Checks if a function throws an error when called.
 *
 * - **Custom Matchers**: Jest allows you to extend its matchers with custom implementations to create more specific or reusable assertions.
 *   - **Creating Custom Matchers**: Use `expect.extend()` to add your own matchers to Jest’s API. This involves defining a matcher function and adding it to Jest’s `expect` object.
 *   - **Using Custom Matchers**: After defining custom matchers, you can use them just like the built-in ones in your tests, enabling more tailored assertions to fit your specific needs.
 *
 * Custom matchers help in making tests more readable and maintainable by abstracting complex assertions into reusable functions.
 */

const multiply = require(".");

// Describe block to group related test cases
describe("Multiply", () => {
  // TEST SUITES "test/it"
  test("2 and 5 multiply should be 10", async () => {
    // Use 'expect' to assert that multiplying 2 and 5 equals 10
    // (toBe is called exact equality(===), meaning it checks for the precise value)
    expect(multiply(2, 5)).toBe(10);
  });

  test("2 and 5 multiply should not be 5", async () => {
    expect(multiply(2, 5)).not.toBe(5);
  });
});

test("Object Equality", () => {
  const data = { alpha: "A" };
  data["beta"] = "B";
  // 'toEqual'(==) checks for deep equality of objects and arrays; "toBe"(===) checks exact equality its mostly used for non objects/array
  expect(data).toEqual({ alpha: "A", beta: "B" });
});

test("Null value", () => {
  const value = null;
  expect(value).toBeNull();
  expect(value).toBeDefined();
  expect(value).toBeFalsy(); // Assert that 'value' is falsy (falsy values include false, 0, "", null, undefined, NaN)
  expect(value).not.toBeUndefined(); // !=
  expect(value).not.toBeTruthy();
});

test("Zero(0) value", () => {
  const value = 0;
  expect(value).not.toBeNull();
  expect(value).toBeDefined();
  expect(value).toBeFalsy();
  expect(value).not.toBeUndefined(); // !=
  expect(value).not.toBeTruthy();
});

// Define a test case for number comparison
test("Number comparison", () => {
  const value = 5 * 2;

  expect(value).toBeGreaterThan(5);

  expect(value).toBeGreaterThanOrEqual(10);

  expect(value).toBeLessThan(20);

  expect(value).toBeLessThanOrEqual(10);

  // Assert that 'value' equals a specific number
  expect(value).toBe(10);
  expect(value).toEqual(10);

  // Assert that 'value' is approximately equal to a number
  expect(value).toBeCloseTo(10.0001, 3); // Within 3 decimal places (4 instead of 3 will fail it)

  expect("React").not.toMatch(/T/); // does not match the regular expression, we can put any regex to be checked
  expect("React").toMatch(/Re/);
});

// Define a test case for checking if an array contains a specific item
test("Array contains specific item", () => {
  const numbers = [1, 2, 3, 4, 5];
  const fruits = ["apple", "banana", "orange"];
  // Use 'expect' to assert that 'numbers' contains the number 3
  expect(numbers).toContain(3);
  // Assert that 'numbers' does not contain the number 6
  expect(numbers).not.toContain(6);
  // Check if the array contains the element "banana"
  expect(fruits).toContain("banana");
  // Check if the array does not contain the element "grape"
  expect(fruits).not.toContain("grape");
});

/**
ONLY: 
Define a test suite with multiple test cases
 */
// describe("Math operations", () => {
//   // This test will be the only one run
//   test.only("multiplication of 2 and 5 should be 10", () => {
//     expect(2 * 5).toBe(10);
//   });

//   // This test will be skipped
//   test("addition of 2 and 3 should be 5", () => {
//     expect(2 + 3).toBe(5);
//   });
//   // This test will also be skipped
//   test("subtraction of 5 and 3 should be 2", () => {
//     expect(5 - 3).toBe(2);
//   });
// });

/**
Exception Matchers
1. toThrow
2. toThrowError
 */
function anotherFaultyFunction() {
  throw new Error("Invalid input");
}

test("anotherFaultyFunction throws an error with specific message", () => {
  // Check that the error message exist
  expect(() => anotherFaultyFunction()).toThrow();

  // Check that the error message contains "Invalid"
  expect(() => anotherFaultyFunction()).toThrow("Invalid");

  // Check that the error message matches exactly "Invalid input"
  expect(() => anotherFaultyFunction()).toThrowError("Invalid input");

  // Check using a regular expression to match the error message
  expect(() => anotherFaultyFunction()).toThrow(/input/);
});

/**
 * FUNCTION MOCKING:
 Function mocking is a technique used in testing to simulate the behavior of real functions in order to control their output and track their usage. This is especially useful when testing components that rely on external dependencies, as it allows you to isolate the code under test and ensure that it behaves as expected without actually calling the real function.
 */
// A simple function to be mocked
function fetchData(callback) {
  callback("Data fetched successfully");
}

// Test case using a mock function
test("fetchData calls the callback with the correct message; fn return true", () => {
  const mockCallback = jest.fn();
  const returnVal = jest.fn(() => true);

  fetchData(mockCallback);
  returnVal();

  // Check that the mock function was called once
  expect(mockCallback).toHaveBeenCalledTimes(1);
  // Check that the mock function was called with the correct argument
  expect(mockCallback).toHaveBeenCalledWith("Data fetched successfully");

  expect(returnVal).toHaveReturned();
  expect(returnVal).toHaveReturnedWith(true);
});
