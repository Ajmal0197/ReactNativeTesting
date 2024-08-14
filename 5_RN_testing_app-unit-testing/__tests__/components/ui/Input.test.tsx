import { act, fireEvent, render, screen } from '@testing-library/react-native';
import Input from '../../../src/components/ui/Input';

describe('Input', () => {
  const mockOnChangeText = jest.fn(); // Mock function to track changes in text input
  const mockOnFocus = jest.fn();     // Mock function to track focus events
  const mockOnBlur = jest.fn();      // Mock function to track blur events

  it('should render correctly', () => {
    // Render the Input component and check if it is rendered
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        testID="inputComponent"
      />,
    );

    expect(getByTestId('inputComponent')).toBeTruthy(); // Verify the component is rendered
  });

  it('should handle multiple focus and blur events', () => {
    // Render the Input component and simulate multiple focus and blur events
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
        onBlur={mockOnBlur}
      />,
    );

    fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event
    fireEvent(getByTestId('textInput'), 'blur', {});  // Simulate blur event
    fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event again
    fireEvent(getByTestId('textInput'), 'blur', {});  // Simulate blur event again

    expect(mockOnFocus).toHaveBeenCalledTimes(2); // Verify onFocus was called twice
    expect(mockOnBlur).toHaveBeenCalledTimes(2);  // Verify onBlur was called twice
  });

  it('should display error text if error prop is provided', () => {
    // Render the Input component with an error message and check if it is displayed
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        error="This is an error"
      />,
    );

    expect(getByTestId('errorText')).toHaveTextContent('This is an error'); // Verify error text is shown
  });

  it('should call onFocus() and setIsFocused state on <Input/> focus', () => {
    // Render the Input component and simulate a focus event
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onFocus={mockOnFocus}
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'focus', {}); // Simulate focus event
    });

    expect(mockOnFocus).toHaveBeenCalled(); // Verify onFocus was called
  });

  it('should call onBlur() and setIsFocused state on <Input/> blur', () => {
    // Render the Input component and simulate a blur event
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        onBlur={mockOnBlur}
      />,
    );

    act(() => {
      fireEvent(getByTestId('textInput'), 'blur', {}); // Simulate blur event
    });

    expect(mockOnBlur).toHaveBeenCalled(); // Verify onBlur was called
  });

  it('should apply disabled style', () => {
    // Render the Input component with disabled prop and verify styles
    const { getByTestId } = render(
      <Input
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Enter Text"
        disabled
      />,
    );

    const inputContainer = getByTestId('parent');
    expect(inputContainer).toHaveStyle({ pointerEvents: 'none' }); // Verify container is non-interactive

    const textInput = getByTestId('textInput');
    expect(textInput.props.editable).toBe(false); // Verify input field is not editable
  });

  it('should call default onFocus function when not provided', () => {
    // Render the Input component without onFocus prop and simulate focus
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

  it('should call default onBlur function when not provided', () => {
    // Render the Input component without onBlur prop and simulate blur
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
