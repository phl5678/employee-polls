import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const errorsSlice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    errorsAdded(state, action) {
      const errors = action.payload;
      return [...state, ...errors];
    },
    errorsReset(state, action) {
      return [];
    }
  }
});

export const { errorsAdded, errorsReset } = errorsSlice.actions;
export default errorsSlice.reducer;
