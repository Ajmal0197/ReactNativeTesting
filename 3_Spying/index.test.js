// Spies in Jest:
// A spy is a testing utility used to observe and record interactions with functions, including tracking how many times a function was called and with what arguments, without altering the function's actual implementation.
// Spies are particularly useful in unit testing to ensure functions within a system are interacting correctly, enabling developers to verify that functions are being invoked as expected and to check the integrity of side effects.

// Module Imports: Import the module (index.js) as a whole using const app = require("./index");. This way, jest.spyOn can be correctly used on properties (myFunction, multiply, add, etc.) of the imported module.
const app = require("./index");

describe("Spying with Jest", () => {
  // Test for standalone function
  test("should spy on myFunction and check if it was called", () => {
    //  Use jest.spyOn(app, "functionName") to spy on each function. This treats each function as a property of the app object (which is the module's exports).
    const spy = jest.spyOn(console, "log");

    // Call the function
    app.myFunction();

    // Check if the function was called with the correct console output
    expect(spy).toHaveBeenCalledWith("Function called!");

    // After each test, the original implementation is restored with mockRestore() to avoid side effects in other tests.
    spy.mockRestore();
  });

  // Test for function with arguments
  test("should spy on multiply and verify arguments", () => {
    // Create a spy on the multiply function
    const multiplySpy = jest.spyOn(app, "multiply");

    // Call the function with arguments
    const result = app.multiply(3, 4);

    // Check if the function was called with the correct arguments
    expect(multiplySpy).toHaveBeenCalledWith(3, 4);

    // Check if the function returns the expected result
    expect(result).toBe(12);

    // Restore the original implementation
    multiplySpy.mockRestore();
  });

  // Test for another utility function
  test("should spy on add and verify arguments", () => {
    // Create a spy on the add function
    const addSpy = jest.spyOn(app, "add");

    // Call the function with arguments
    const result = app.add(5, 7);

    // Check if the function was called with the correct arguments
    expect(addSpy).toHaveBeenCalledWith(5, 7);

    // Check if the function returns the expected result
    expect(result).toBe(12);

    // Restore the original implementation
    addSpy.mockRestore();
  });

  // Test for object method
  test("should spy on greet method", () => {
    const user = new app.User("Alice");
    const greetSpy = jest.spyOn(user, "greet");

    // Call the greet method
    const greeting = user.greet();

    // Check if greet was called
    expect(greetSpy).toHaveBeenCalled();

    // Check if greet returns the expected string
    expect(greeting).toBe("Hello, Alice!");

    // Restore the original implementation
    greetSpy.mockRestore();
  });
});
