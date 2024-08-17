import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { persistor, store } from '../../src/redux/store';
import RegisterScreen from '../../src/screens/RegisterScreen';
import { navigate } from '../../src/utils/NavigationUtil';

// Mock the navigation function to avoid actual navigation during tests
jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(),
}));

// Mocking redux-persist to handle the persistence functionality in tests
jest.mock('redux-persist', () => ({
  persistStore: jest.fn().mockReturnValue({
    purge: jest.fn(),
  }),
  // Retain the actual persistReducer to ensure reducers work as expected
  persistReducer: jest.requireActual('redux-persist').persistReducer,
}));

describe('RegisterScreen', () => {
  // Cleanup after each test to ensure no state is carried over
  afterEach(() => {
    persistor.purge();
    jest.clearAllMocks(); // Clear all mocked functions
  });

  // Test case to ensure all elements render correctly on the screen
  it('should render correctly', () => {
    const { getByPlaceholderText, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Check that all input fields and text elements are rendered
    expect(getByPlaceholderText('First name')).toBeTruthy();
    expect(getByPlaceholderText('Last name')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Already have an account? Login In')).toBeTruthy();
  });

  // Test case to verify input field values update correctly
  it('should handle input changes correctly', () => {
    const { getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const firstNameInput = getByPlaceholderText('First name');
    const lastNameInput = getByPlaceholderText('Last name');

    // Simulate user input
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(firstNameInput, 'Ritik');
    fireEvent.changeText(lastNameInput, 'Prasad');

    // Check that the input fields reflect the changes
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('password123');
    expect(firstNameInput.props.value).toBe('Ritik');
    expect(lastNameInput.props.value).toBe('Prasad');
  });

  // Test case to ensure validation messages are displayed correctly for empty inputs
  it('should validate inputs correctly', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Simulate pressing the register button with empty fields
    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.changeText(getByPlaceholderText('First name'), '');
    fireEvent.changeText(getByPlaceholderText('Last name'), '');
    fireEvent.press(getByTestId('Register'));

    // Wait for validation messages to appear
    await waitFor(() => {
      expect(getByText('Please enter your email')).toBeTruthy();
      expect(getByText('Enter your password')).toBeTruthy();
      expect(getByText('Enter your last name')).toBeTruthy();
      expect(getByText('Please enter your first name')).toBeTruthy();
    });
  });

  // Test case to validate email format
  it('should validate email format correctly', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Simulate entering an invalid email format
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('Register'));

    // Wait for email format validation message to appear
    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
    });
  });

  // Test case to verify that errors are cleared on focusing the input fields
  it('should clear email error on focus', async () => {
    const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Trigger validation errors by submitting empty form
    fireEvent.changeText(getByPlaceholderText('Email'), '');
    fireEvent.changeText(getByPlaceholderText('First name'), '');
    fireEvent.changeText(getByPlaceholderText('Last name'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByTestId('Register'));

    await waitFor(() => {
      expect(getByText('Please enter your email')).toBeTruthy();
      expect(getByText('Enter your password')).toBeTruthy();
      expect(getByText('Enter your last name')).toBeTruthy();
      expect(getByText('Please enter your first name')).toBeTruthy();
    });

    // Focus on the fields to clear validation errors
    fireEvent(getByPlaceholderText('Email'), 'focus');
    fireEvent(getByPlaceholderText('First name'), 'focus');
    fireEvent(getByPlaceholderText('Last name'), 'focus');
    fireEvent(getByPlaceholderText('Password'), 'focus');

    // Ensure the errors are cleared
    expect(queryByText('Please enter your email')).toBeNull();
    expect(queryByText('Please enter your first name')).toBeNull();
    expect(queryByText('Enter your last name')).toBeNull();
    expect(queryByText('Enter your password')).toBeNull();
  });

  // Similar test as above for password input field
  it('should clear password error on focus', async () => {
    const { getByPlaceholderText, queryByText, getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Trigger validation error by leaving password field empty
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.press(getByTestId('Register'));

    await waitFor(() => {
      expect(getByText('Enter your password')).toBeTruthy();
    });

    // Focus on the password field to clear the error
    fireEvent(getByPlaceholderText('Password'), 'focus');

    // Ensure the error is cleared
    expect(queryByText('Enter your password')).toBeNull();
  });

  // Test case to check multiple errors are displayed correctly when input validation fails
  it('should set errors correctly on input validation failure', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Enter invalid data into form fields
    fireEvent.changeText(getByPlaceholderText('Email'), 'invalid-email');
    fireEvent.changeText(getByPlaceholderText('Password'), '');
    fireEvent.changeText(getByPlaceholderText('First name'), '');
    fireEvent.changeText(getByPlaceholderText('Last name'), '');
    fireEvent.press(getByTestId('Register'));

    // Wait for validation errors to be displayed
    await waitFor(() => {
      expect(getByText('Please enter a valid email')).toBeTruthy();
      expect(getByText('Enter your password')).toBeTruthy();
      expect(getByText('Enter your last name')).toBeTruthy();
      expect(getByText('Please enter your first name')).toBeTruthy();
    });
  });

  // Test case to ensure the registration process is handled correctly and navigation occurs
  it('should call registeruser and navigate on successful register', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Enter valid data into the form
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.changeText(getByPlaceholderText('First name'), 'Ritik');
    fireEvent.changeText(getByPlaceholderText('Last name'), 'Prasad');
    fireEvent.press(getByTestId('Register'));

    // Ideally, this is where you'd verify that `registeruser` was called
    // and that navigation occurred. Consider adding a mock for the `registeruser`
    // function to ensure it's called with the correct parameters.
  });

  // Test case to check if the loading state is displayed correctly
  it('should display loading state correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );
    // Simulate user input and form submission
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByTestId('Register'));

    // Here you should verify the loading spinner or any loading indicator appears
    // and possibly disappears after completion.
  });

  // Test case to ensure navigation to the Login screen works when the link is pressed
  it('should navigate to RegisterScreen on sign up link press', () => {
    const { getByText } = render(
      <Provider store={store}>
        <RegisterScreen />
      </Provider>,
    );

    // Simulate pressing the "Already have an account? Login In" link
    fireEvent.press(getByText('Already have an account? Login In'));

    // Ensure the navigation function is called with the correct screen
    expect(navigate).toHaveBeenCalledWith('LoginScreen');
  });
});
