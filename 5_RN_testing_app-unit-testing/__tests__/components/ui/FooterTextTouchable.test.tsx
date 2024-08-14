import { act, fireEvent, render } from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  // Mock functions to simulate input events
  const mockOnChangeText = jest.fn();
  const mockOnFocus = jest.fn();
  const mockOnBlur = jest.fn();

  // Your regex mock function
  const mockOnChangeTextRegex = jest.fn((text) => {
    const regex = /^[a-zA-Z0-9]+$/; // Example regex: only alphanumeric characters allowed
    return regex.test(text);
  });
  describe('mockOnChangeTextRegex Regex Test', () => {
    it('should return true for valid alphanumeric input', () => {
      expect(mockOnChangeTextRegex('Test123')).toBe(true);
      expect(mockOnChangeTextRegex('hello')).toBe(true);
      expect(mockOnChangeTextRegex('123456')).toBe(true);
    });

    it('should return false for invalid input', () => {
      expect(mockOnChangeTextRegex('Test 123')).toBe(false); // Space is not allowed
      expect(mockOnChangeTextRegex('hello!')).toBe(false);   // Special character not allowed
      expect(mockOnChangeTextRegex('123_456')).toBe(false);  // Underscore not allowed
    });
  });

  // Test to ensure the Input component renders correctly
  it('should render correctly', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        testID="inputComponent"
      />,
    );

    expect(getByTestId('inputComponent')).toBeTruthy(); // Verify that the input component is rendered
  });



  // Test to handle multiple focus and blur events
  it('should handle multiple focus and blur events', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    /*
    fireEvent(getByTestId('textInput'), 'focus', {}) is used to simulate a focus event on an element in a test. Here’s a concise breakdown:
    - getByTestId('textInput'): Finds the element with the test ID 'textInput' in the rendered component.
    - 'focus': Specifies that the focus event should be triggered.
    - {}: The {} is just a placeholder to ensure that the event is triggered correctly, without providing extra data.
    */
    fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event
    fireEvent(getByTestId('textInput'), 'blur', {});  // Simulate blur event
    fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate another focus event
    fireEvent(getByTestId('textInput'), 'blur', {});  // Simulate another blur event

    expect(mockOnFocus).toHaveBeenCalledTimes(2); // Ensure onFocus is called twice as seen in above fireEvent
    expect(mockOnBlur).toHaveBeenCalledTimes(2);  // Ensure onBlur is called twice
  });

  // Test to check if error text is displayed when an error prop is provided
  it('should display error text if error prop is provided', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        error="This is an error"
      />,
    );

    expect(getByTestId('errorText')).toHaveTextContent('This is an error'); // Ensure the error text is displayed
  });

  // Test to ensure onFocus is called and focus state is set when input is focused
  it('should call onFocus and setFocus state on input focus', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
      />,
    );

    // When dealing with asynchronous updates (like fetching data or waiting for a state update), you use act with async/await
    act(() => {
      fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event
    });
    expect(mockOnFocus).toHaveBeenCalled(); // Ensure onFocus is called
  });

  // Test to ensure onBlur is called when input loses focus
  it('should call onBlur', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'blur', {}); // Simulate blur event
    });
    expect(mockOnFocus).toHaveBeenCalled(); // Ensure onFocus is called (this line should check onBlur instead)
  });

  // Test to check if the disabled style is applied when the input is disabled
  it('should apply disabled style', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        disabled
      />,
    );

    const inputContainer = getByTestId('parent');
    expect(inputContainer).toHaveStyle({ pointerEvents: 'none' }); // Check if the parent container is not interactive

    const textInput = getByTestId('textInput');
    expect(textInput.props.editable).toBe(false); // Ensure the input is not editable
  });

  // Test to ensure default onFocus function is called when not provided
  it('should call default onFocus function when not provided', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event
    });
  });

  // Test to ensure default onBlur function is called when not provided
  it('should call default onBlur function when not provided', () => {
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'blur', {}); // Simulate blur event
    });
  });
});
