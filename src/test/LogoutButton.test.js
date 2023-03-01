import { render, fireEvent } from '@testing-library/react';
import LogoutButton from '../components/LogoutButton';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from '@reduxjs/toolkit';
import reducers from '../reducers';
import middleware from '../middleware';
import { Provider } from 'react-redux';

const mockStore = createStore(reducers, middleware);
const mockHandleUserLogout = jest.fn();
jest.mock('../actions/authedUser.js', () => ({
  handleUserLogout: () => mockHandleUserLogout,
}));

describe('testing <LogoutButton />', () => {
  it('should match the snapshot', () => {
    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LogoutButton />
        </BrowserRouter>
      </Provider>
    );
    expect(comp).toMatchSnapshot();
  });
  it('should call handleUserLogout action after clicking the logout button', () => {
    const comp = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LogoutButton />
        </BrowserRouter>
      </Provider>
    );
    const button = comp.getByText('Log Out');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(mockHandleUserLogout).toHaveBeenCalled();
  });
});
