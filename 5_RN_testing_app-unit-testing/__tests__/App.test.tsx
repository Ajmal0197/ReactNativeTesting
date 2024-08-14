import { render } from '@testing-library/react-native';
import App from '../App';

//  It aims to capture a snapshot of the rendered App component and compare it with a previously saved snapshot to ensure that the component's output remains consistent over time.
test('Snapshot App', () => {
    const { toJSON } = render(<App />);
    // Render the App component and destructure the toJSON method from the result.
    // The render function returns a set of utilities, including toJSON, which serializes the rendered component to a JSON object.

    expect(toJSON()).toMatchSnapshot();
    // Use Jest's expect function to assert that the JSON representation of the rendered component matches the stored snapshot.
    // The toMatchSnapshot method automatically generates a snapshot file if it doesn't exist or compares against the existing snapshot.
});
