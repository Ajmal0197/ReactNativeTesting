import { persistStore } from 'redux-persist'; // Import persistStore from redux-persist
import { RootState, store } from '../../../src/redux/store'; // Import RootState and store from the redux setup
import {
  loginUser,
  registerUser,
  selectUser,
  setUser,
} from '../../../src/redux/reducers/userSlice'; // Import user-related actions and selectors from userSlice

// Mock persistStore to prevent it from persisting the store in tests
jest.mock('redux-persist', () => {
  const actualReduxPersist = jest.requireActual('redux-persist'); // Get the actual redux-persist module
  return {
    ...actualReduxPersist, // Spread the actual module's exports
    persistStore: jest.fn().mockReturnValue({}), // Mock persistStore to return an empty object
  };
});

describe('userSlice', () => {
  test('should handle Initial State', () => {
    const state = store.getState() as RootState; // Get the current state of the store
    expect(selectUser(state)).toBeNull(); // Expect the initial user state to be null
  });

  test('should handle setUser', () => {
    const user = { name: 'Ritik', email: 'Ritik@gmail.com' }; // Define a user object
    store.dispatch(setUser(user)); // Dispatch the setUser action
    const state = store.getState() as RootState; // Get the updated state
    expect(selectUser(state)).toEqual(user); // Expect the user state to match the dispatched user object
  });
});

describe('register user thunk', () => {
  test('should handle successful registration', async () => {
    const user = { name: 'Ritik', email: 'Ritik@gmail.com' }; // Define a user object
    const action = await store.dispatch(registerUser(user)); // Dispatch the registerUser thunk
    const state = store.getState() as RootState; // Get the updated state

    expect(action.type).toBe(registerUser.fulfilled.type); // Expect the action type to be fulfilled
    expect(selectUser(state)).toEqual(user); // Expect the user state to match the registered user
  });

  test('should handle failure', async () => {
    const action = await store.dispatch(registerUser({})); // Dispatch registerUser with an empty object to simulate failure
    const state = store.getState() as RootState; // Get the updated state

    expect(action.type).toBe(registerUser.rejected.type); // Expect the action type to be rejected
    expect(selectUser(state)).toBeNull(); // Expect the user state to remain null
  });
});

describe('login user thunk', () => {
  test('should handle successful login', async () => {
    const credentials = { email: 'Ritik@gmail.com', password: '12345677' }; // Define user credentials
    const action = await store.dispatch(loginUser(credentials)); // Dispatch the loginUser thunk
    const state = store.getState() as RootState; // Get the updated state

    expect(action.type).toBe(loginUser.fulfilled.type); // Expect the action type to be fulfilled
    expect(selectUser(state)).toEqual(credentials); // Expect the user state to match the login credentials
  });

  test('should handle failure', async () => {
    const action = await store.dispatch(loginUser({})); // Dispatch loginUser with an empty object to simulate failure
    const state = store.getState() as RootState; // Get the updated state

    expect(action.type).toBe(loginUser.rejected.type); // Expect the action type to be rejected
    expect(selectUser(state)).toBeNull(); // Expect the user state to remain null
  });
});
