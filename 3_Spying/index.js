// app.js

// Standalone function
function myFunction() {
  console.log("Function called!");
}

// Utility functions with arguments
function multiply(a, b) {
  return a * b;
}

function add(a, b) {
  return a + b;
}

// Class with methods
class User {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, ${this.name}!`;
  }
}

module.exports = { myFunction, multiply, add, User };
