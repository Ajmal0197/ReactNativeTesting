/**
 * Mocking is a powerful testing technique that allows you to simulate and control the behavior of functions, modules, or libraries.
 * This is particularly useful for isolating the code under test and managing dependencies, ensuring that tests are focused and reliable.
 *
 * Summary of Mocking Techniques in Jest:
 *
 * - **Mock Functions**: Create mock functions using `jest.fn()`. You can configure their behavior with `mockReturnValue` to specify return values or `mockImplementation` to define custom behavior.
 *
 * - **Mock Modules**: Use `jest.mock()` to mock entire modules or specific exports. This allows you to replace module implementations with mocks, enabling you to test how your code interacts with these modules.
 *
 * - **Mock Class Methods**: Use `jest.spyOn()` to create spies on methods of class instances. This lets you track method calls and control their implementation while keeping the original class intact.
 *
 * - **Mock Timers**: Control and manipulate timer functions such as `setTimeout` and `setInterval` using `jest.useFakeTimers()`. This is useful for testing code that relies on time-based operations.
 */

jest.mock("./mathUtils"); // will point __mocks__/mathUtils.js
// Automatically use the mocks from __mocks__/mathUtils.js
// This tells Jest to use the mock implementations of the functions
// from the mathUtils module, located in the __mocks__ directory.

const { calculate } = require("./index");
// Import the calculate function from the index module for testing.

const { add, subtract, multiply, divide } = require("./mathUtils");
// Import the mocked functions from the mathUtils module. These will be the mock versions
// instead of the actual implementations, due to the jest.mock call above.

describe("calculate", () => {
  // Group related tests for the calculate function within a describe block.

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    // Reset the state of all mocks before each test to ensure tests do not
    // interfere with each other.
    jest.clearAllMocks();
  });

  test("calls add with correct arguments", () => {
    // Test that the calculate function calls add with correct arguments when the operation is "add".
    calculate(1, 2, "add");
    expect(add).toHaveBeenCalled();
    // Check that the add function was called.
    expect(add).toHaveBeenCalledWith(1, 2);
    // Check that add was called with the arguments 1 and 2.
  });

  test("calls subtract with correct arguments", () => {
    // Test that the calculate function calls subtract with correct arguments when the operation is "subtract".
    calculate(5, 3, "subtract");
    expect(subtract).toHaveBeenCalled();
    // Check that the subtract function was called.
    expect(subtract).toHaveBeenCalledWith(5, 3);
    // Check that subtract was called with the arguments 5 and 3.
  });

  test("calls multiply with correct arguments", () => {
    // Test that the calculate function calls multiply with correct arguments when the operation is "multiply".
    calculate(2, 4, "multiply");
    expect(multiply).toHaveBeenCalled();
    // Check that the multiply function was called.
    expect(multiply).toHaveBeenCalledWith(2, 4);
    // Check that multiply was called with the arguments 2 and 4.
  });

  test("calls divide with correct arguments", () => {
    // Test that the calculate function calls divide with correct arguments when the operation is "divide".
    calculate(10, 2, "divide");
    expect(divide).toHaveBeenCalled();
    // Check that the divide function was called.
    expect(divide).toHaveBeenCalledWith(10, 2);
    // Check that divide was called with the arguments 10 and 2.
  });

  // The following tests are commented out but demonstrate how you might
  // test for exceptions.

  // test('throws error for invalid operation', () => {
  //   // Test that the calculate function throws an error when an invalid operation is provided.
  //   expect(() => calculate(1, 2, 'invalid')).toThrow('Invalid operation');
  //   // Check that an error is thrown with the message 'Invalid operation'.
  // });

  // test('throws error for divide by zero', () => {
  //   // Test that the calculate function throws an error when attempting to divide by zero.
  //   expect(() => calculate(1, 0, 'divide')).toThrow('Cannot divide by zero');
  //   // Check that an error is thrown with the message 'Cannot divide by zero'.
  // });
});
