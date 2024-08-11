/**
 * Setup and Teardown:
 * are used to prepare your testing environment before running tests and to clean up afterward.
 * This ensures that each test runs in a clean state without interference from other tests.
 * Jest provides several lifecycle methods to handle setup and teardown, including beforeAll, beforeEach, afterAll, and afterEach.
 *
 * Here's an explanation of each and an example to demonstrate their use:
 *
 * Lifecycle Methods
 * - beforeAll(fn): Runs once before all the tests in a file start.
 * - beforeEach(fn): Runs before each individual test in a file.
 * - afterAll(fn): Runs once after all the tests in a file complete.
 * - afterEach(fn): Runs after each individual test in a file.
 *
 * These methods are useful for tasks such as:
 * - Connecting to a database.
 * - Setting up mock servers or API calls.
 * - Cleaning up after tests to prevent memory leaks or residual state.
 */

const { addToArray, removeFromArray, arrayContains } = require("./arrayUtils");

let testArray; // Global variable to be used in tests

// Runs once before all tests
beforeAll(() => {
  console.log("Before all tests: Initialize test array");
  testArray = []; // Initialize test array
});

// Runs once after all tests
afterAll(() => {
  console.log("After all tests: Clear test array");
  testArray = null; // Clear test array
});

// Runs before each individual test
beforeEach(() => {
  console.log("Before each test: Reset test array");
  testArray = []; // Reset test array to empty
});

// Runs after each individual test
afterEach(() => {
  console.log("After each test: Log test array");
  console.log(testArray); // Log the current state of the test array
});

// Test for adding an item to the array
test("add item to array", () => {
  addToArray(testArray, "apple"); // Add 'apple' to the array
  expect(testArray).toContain("apple"); // Check that 'apple' is in the array
});

// Test for removing an item from the array
test("remove item from array", () => {
  addToArray(testArray, "banana"); // Add 'banana' to the array
  removeFromArray(testArray, "banana"); // Remove 'banana' from the array
  expect(testArray).not.toContain("banana"); // Check that 'banana' is not in the array
});

// Test for checking if the array contains an item
test("check if array contains item", () => {
  addToArray(testArray, "cherry"); // Add 'cherry' to the array
  expect(arrayContains(testArray, "cherry")).toBeTruthy(); // Check that the array contains 'cherry'
});

// Describe block for nested tests with their own setup and teardown
describe("nested array operations", () => {
  // Runs before each test in the nested describe block
  beforeEach(() => {
    console.log("Before each nested test: Add initial items");
    addToArray(testArray, "date"); // Add 'date' to the array
    addToArray(testArray, "elderberry"); // Add 'elderberry' to the array
  });

  // Runs after each test in the nested describe block
  afterEach(() => {
    console.log("After each nested test: Clear test array");
    testArray = []; // Clear the test array
  });

  // Test for adding an item to a pre-filled array
  test("nested test: add item to pre-filled array", () => {
    addToArray(testArray, "fig"); // Add 'fig' to the pre-filled array
    expect(testArray).toContain("fig"); // Check that 'fig' is in the array
  });

  // Test for removing an item from a pre-filled array
  test("nested test: remove item from pre-filled array", () => {
    removeFromArray(testArray, "date"); // Remove 'date' from the array
    expect(testArray).not.toContain("date"); // Check that 'date' is not in the array
  });
});
