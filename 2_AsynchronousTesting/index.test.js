/**
 * ASYNCHRONOUS TESTING:
 * Asynchronous testing is essential for verifying code that interacts with promises, callbacks, or async/await syntax.
 * Jest offers a range of utilities to handle and test asynchronous code effectively.
 * Here’s an overview of how you can manage asynchronous tests using different approaches:
 *
 * - **Callbacks**: Use `done` callback to signal the end of an asynchronous test. This is useful for verifying that asynchronous operations have completed and the expected results are achieved.
 *
 * - **Promises**: Return a promise from the test function and use `.then()` or `.catch()` to assert results or handle errors. This ensures that Jest waits for the promise to resolve or reject before completing the test.
 *
 * - **Async/Await**: Mark your test function as `async` and use `await` to handle promises directly. This provides a more readable and straightforward way to work with asynchronous code.
 *
 * Examples of handling asynchronous tests in Jest include:
 * - Using `done` for callbacks
 * - Returning promises for `.then()` assertions
 * - Employing `async/await` for more readable async code
 */

const fetchData = require(".");

// Test that fetchData resolves to "chocolate" using promise chaining
test('api should return "chocolate" using promise', () =>
  fetchData().then((data) => {
    expect(data).toBe("chocolate");
  }));

// Test that fetchData rejects with "error occurred" using promise chaining
test("api should return error using promise", () => {
  return fetchData(true).catch((error) => {
    expect(error).toBe("error occurred");
  });
});

// Test that fetchData resolves to "chocolate" using async/await syntax
test('api should return "chocolate" using async await', async () => {
  const data = await fetchData();
  expect(data).toBe("chocolate");
});

// Test that fetchData resolves to "chocolate" using resolves matcher
test("fetch resolved", async () => {
  await expect(fetchData()).resolves.toBe("chocolate");
});

// Test that fetchData rejects with an error message containing "error occurred" using rejects matcher
test("fetch rejected", async () => {
  await expect(fetchData(true)).rejects.toMatch("error occurred");
});

// Test that fetchData fails with "error occurred" when called with true
test("fetch fails", async () => {
  expect.assertions(1); // Ensures one assertion is called
  try {
    await fetchData(true);
  } catch (error) {
    expect(error).toBe("error occurred");
  }
});
