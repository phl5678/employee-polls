import { act, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import { renderWithContext } from './test-utils';

describe('testing <LoginPage />', () => {
  it('should match the snapshot', () => {
    renderWithContext(<LoginPage />);
    expect(screen).toMatchSnapshot();
  });

  it('should contain a login form with an ID input field, password input field, and a disabled Submit button.', () => {
    renderWithContext(<LoginPage />);

    expect(screen.getByTestId('login-form')).toBeInTheDocument();
    expect(screen.getByTestId('id-input')).toBeInTheDocument();
    expect(screen.getByTestId('pw-input')).toBeInTheDocument();
    const button = screen.getByTestId('login-button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('should disable submit button when id is empty', () => {
    const user = { id: 'sarahedo', password: 'password123' };

    renderWithContext(<LoginPage />);

    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    expect(screen.getByTestId('login-button')).toBeDisabled();
  });

  it('should enable submit button when id and password both not empty.', () => {
    const user = { id: 'sarahedo', password: 'password123' };

    renderWithContext(<LoginPage />);

    fireEvent.change(screen.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    expect(screen.getByTestId('login-button')).not.toBeDisabled();
  });

  it('should disaply errors when user not found.', async () => {
    const user = { id: 'test', password: 'test' };

    act(() => {
      renderWithContext(<LoginPage />);
    });

    const form = await waitFor(() => screen.getByTestId('login-form'));
    fireEvent.change(screen.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    fireEvent.submit(form);

    const error = await waitFor(() => screen.getByTestId('errors-list'));
    expect(error).toBeInTheDocument();
    expect(error.textContent).toEqual('No user found.');
  });

  it('should disaply errors when password not matched.', async () => {
    const user = { id: 'sarahedo', password: 'test' };

    act(() => {
      renderWithContext(<LoginPage />);
    });
    const form = await waitFor(() => screen.getByTestId('login-form'));
    fireEvent.change(screen.getByTestId('id-input'), { target: { value: user.id } });
    fireEvent.change(screen.getByTestId('pw-input'), { target: { value: user.password } });
    fireEvent.submit(form);

    const error = await waitFor(() => screen.getByTestId('errors-list'));
    expect(error).toBeInTheDocument();
    expect(error.textContent).toEqual('Password not matched.');
  });
});
