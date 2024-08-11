/**
Usage in Testing
These mock implementations are useful for testing because they allow you to:

Verify Calls: Check if the functions were called, how many times they were called, and with what arguments.
Simulate Behavior: Mimic specific behavior, such as throwing an error when dividing by zero, to test how your code handles these scenarios.
Isolation: Test your code in isolation without relying on actual implementations of these functions, which is particularly useful in unit tests to avoid side effects.
 */

const add = jest.fn((a, b) => a + b);
const subtract = jest.fn((a, b) => a - b);
const multiply = jest.fn((a, b) => a * b);
const divide = jest.fn((a, b) => {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
});

module.exports = { add, subtract, multiply, divide };
