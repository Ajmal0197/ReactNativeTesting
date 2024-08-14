import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native'; // Import navigation utilities from React Navigation
import {
  goBack,
  navigate,
  navigationRef,
  prepareNavigation,
  push,
  resetAndNavigate,
} from '../../src/utils/NavigationUtil'; // Import custom navigation functions from your project

// Mock the React Navigation library to control its behavior in tests
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native'); // Import the actual module
  return {
    ...actualNav, // Spread the actual module's exports
    createNavigationContainerRef: jest.fn(() => ({
      isReady: jest.fn().mockReturnValue(true), // Mock isReady to always return true
      dispatch: jest.fn(), // Mock dispatch function to track its calls
    })),
    CommonActions: {
      navigate: jest.fn(), // Mock navigate action to track its calls
      reset: jest.fn(), // Mock reset action to track its calls
      goBack: jest.fn(), // Mock goBack action to track its calls
    },
    StackActions: {
      push: jest.fn(), // Mock push action to track its calls
    },
  };
});

describe('Navigation Functions', () => {
  it('should navigate to a route', async () => {
    const routeName = 'TestRoute'; // Define the route name
    const params = { key: 'val' }; // Define the parameters
    await navigate(routeName, params); // Call the navigate function

    expect(CommonActions.navigate).toHaveBeenCalledWith(routeName, params); // Check if navigate action was called with correct arguments
  });

  it('should reset and navigate to a route', async () => {
    const routeName = 'TestRoute'; // Define the route name

    await resetAndNavigate(routeName); // Call the resetAndNavigate function

    expect(CommonActions.reset).toHaveBeenCalledWith({
      index: 0, // Ensure the stack index is reset
      routes: [{ name: routeName }], // Ensure the correct route is set
    });
  });

  it('should push a route', async () => {
    const routeName = 'TestRoute'; // Define the route name
    const params = { key: 'val' }; // Define the parameters
    await push(routeName, params); // Call the push function

    expect(StackActions.push).toHaveBeenCalledWith(routeName, params); // Check if push action was called with correct arguments
  });

  it('should go back', async () => {
    await goBack(); // Call the goBack function
    expect(CommonActions.goBack).toHaveBeenCalled(); // Check if goBack action was called
  });

  it('should prepare navigation', async () => {
    await prepareNavigation(); // Call the prepareNavigation function
    expect(navigationRef.isReady).toHaveBeenCalled(); // Check if isReady was called
  });
});
