import { screen, fireEvent } from '@testing-library/react';
import LogoutButton from '../components/LogoutButton';
import { renderWithContext } from './test-utils';

const mockHandleUserLogout = jest.fn();
jest.mock('../actions/authedUser.js', () => ({
  ...jest.requireActual('../actions/authedUser.js'),
  handleUserLogout: () => mockHandleUserLogout,
}));

describe('testing <LogoutButton />', () => {
  it('should match the snapshot', () => {
    renderWithContext(<LogoutButton />);
    expect(screen).toMatchSnapshot();
  });
  it('should call handleUserLogout action after clicking the logout button', () => {
    renderWithContext(<LogoutButton />);
    const button = screen.getByText('Log Out');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockHandleUserLogout).toHaveBeenCalled();
  });
});
