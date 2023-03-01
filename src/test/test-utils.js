import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import logger from '../middleware/logger';

const initialState = {
  authedUserID: null,
  users: {},
  questions: {},
  errors: [],
  loadingBar: { default: 0 },
};

const middleware = (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk);

const mockStore = configureStore({
  reducer,
  middleware,
});

function getStoreWithState(preloadedState) {
  preloadedState = preloadedState === undefined ? initialState : preloadedState;
  return configureStore({
    reducer,
    middleware,
    preloadedState,
  });
}

export function renderWithContext(element, state) {
  const store = getStoreWithState(state);
  const utils = render(
    <Provider store={store}>
      <BrowserRouter>{element}</BrowserRouter>
    </Provider>
  );
  return { store, ...utils };
}
