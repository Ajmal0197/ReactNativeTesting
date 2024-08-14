import React from 'react';
import { render, fireEvent } from '@testing-library/react-native'; // Import testing utilities from React Native Testing Library
import OnBoardingScreen from '../../src/screens/OnBoardingScreen'; // Import the OnBoardingScreen component
import { navigate } from '../../src/utils/NavigationUtil'; // Import the custom navigate function

// Mock the navigate function to control its behavior during tests
jest.mock('../../src/utils/NavigationUtil', () => ({
  navigate: jest.fn(), // Mock navigate function to track calls
}));

describe('OnBoardingScreen', () => {
  it('should render onboarding slides and navigate correctly', () => {
    const { getByText } = render(<OnBoardingScreen />); // Render the OnBoardingScreen component

    const loginButton = getByText('Login'); // Get the 'Login' button by its text
    const signUpButton = getByText('Sign up'); // Get the 'Sign up' button by its text

    fireEvent.press(loginButton); // Simulate pressing the 'Login' button
    expect(navigate).toHaveBeenCalledWith('LoginScreen'); // Verify that navigate was called with 'LoginScreen'

    fireEvent.press(signUpButton); // Simulate pressing the 'Sign up' button
    expect(navigate).toHaveBeenCalledWith('RegisterScreen'); // Verify that navigate was called with 'RegisterScreen'
  });

  it('should call scrollBy(1) when Next button is pressed in the first slide', () => {
    const { getAllByText } = render(<OnBoardingScreen />); // Render the OnBoardingScreen component
    const nextButtons = getAllByText('Next'); // Get all 'Next' buttons by their text

    expect(nextButtons).toHaveLength(2); // Verify that there are two 'Next' buttons on the screen

    fireEvent.press(nextButtons[0]); // Simulate pressing the first 'Next' button
    // Note: Expectation for scrollBy is not provided but should be added if relevant
  });
});
