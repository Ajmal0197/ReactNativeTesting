import { MMKV } from 'react-native-mmkv'; // Import MMKV for storage
import reduxStorage from '../../src/redux/storage'; // Import reduxStorage for testing

// Mock MMKV to avoid actual storage operations
jest.mock('react-native-mmkv', () => {
  // Create mock functions for MMKV methods
  const setMock = jest.fn(); // Mock function to simulate setting a value in storage
  const getStringMock = jest.fn(); // Mock function to simulate retrieving a string value from storage
  const deleteMock = jest.fn(); // Mock function to simulate deleting a value from storage

  return {
    // Mock the MMKV class constructor
    MMKV: jest.fn().mockImplementation(() => ({
      set: setMock, // Return the mocked set function when MMKV's set method is called
      getString: getStringMock, // Return the mocked getString function when MMKV's getString method is called
      delete: deleteMock, // Return the mocked delete function when MMKV's delete method is called
    })),
    setMock, // Export the mock function for setting values (useful for assertions in tests)
    getStringMock, // Export the mock function for retrieving string values (useful for assertions in tests)
    deleteMock, // Export the mock function for deleting values (useful for assertions in tests)
  };
});


describe('reduxStorage', () => {
  let setMock: jest.Mock; // Placeholder for set mock function
  let getStringMock: jest.Mock; // Placeholder for getString mock function
  let deleteMock: jest.Mock; // Placeholder for delete mock function

  beforeEach(() => {
    // Reassign mocks before each test
    ({ setMock, getStringMock, deleteMock } = require('react-native-mmkv'));
  });

  afterEach(() => {
    // Clear mock call history after each test
    jest.clearAllMocks();
  });
  test('Set Item', async () => {
    const key = 'testKey'; // Key for storage
    const value = 'testValue'; // Value to store
    await reduxStorage.setItem(key, value); // Test setItem method
    expect(setMock).toHaveBeenCalledWith(key, value); // Verify set was called with correct arguments
  });

  test('Get Item', async () => {
    const key = 'testKey'; // Key for retrieval
    const value = 'testValue'; // Expected value
    getStringMock.mockReturnValue(value); // Mock return value(getStringMock.mockReturnValue(value) is used to specify what value the mock function getStringMock should return when called)
    const result = await reduxStorage.getItem(key); // Test getItem method
    expect(result).toBe(value); // Verify returned value
    expect(getStringMock).toHaveBeenCalledWith(key); // Verify getString was called with key
  });

  test('Delete Item', async () => {
    const key = 'testKey'; // Key for deletion
    await reduxStorage.removeItem(key); // Test removeItem method
    expect(deleteMock).toHaveBeenCalledWith(key); // Verify delete was called with key
  });
});
