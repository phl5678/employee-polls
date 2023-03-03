import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import configureAppStore from '../configureAppStore';

const initialState = {
  authedUserID: null,
  users: {},
  questions: {},
  errors: [],
  loadingBar: { default: 0 }
};

export function renderWithContext(element, state) {
  const store = configureAppStore(state ? state : initialState);
  const utils = render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
  return { store, ...utils };
}
