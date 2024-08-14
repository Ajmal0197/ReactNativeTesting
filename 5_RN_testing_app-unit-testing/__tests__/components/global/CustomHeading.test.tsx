import { fireEvent, render } from '@testing-library/react-native'
import CustomHeading from '../../../src/components/global/CustomHeading'
import { goBack } from '../../../src/utils/NavigationUtil'

//Mock the goBack function
jest.mock('../../../src/utils/NavigationUtil', () => ({
    goBack: jest.fn() // "jest.fn()" provides a way to verify the behavior of code that relies on functions without executing the real function logic.
}))

describe('Custom Heading', () => {
    it('Should render the title correctly', () => {
        const title = 'Test title'
        const { getByText } = render(<CustomHeading title={title} />)

        expect(getByText(title)).toBeTruthy()
    })

    it('should call goback when back button is pressed', () => {
        const { getByTestId } = render(<CustomHeading title='Test' />)
        const backButton = getByTestId('back-button')

        fireEvent.press(backButton)
        expect(goBack).toHaveBeenCalled()
    })
})