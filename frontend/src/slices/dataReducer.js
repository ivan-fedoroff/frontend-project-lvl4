/* eslint-disable functional/no-expression-statements, no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channelsData: {},
};

const dataSlice = createSlice({
  name: 'chatDataLoader',
  initialState,

  reducers: {
    mountData: (state, { payload }) => {
      state.channelsData = { ...state.channelsData, ...payload };
    },
  },
});

export const { mountData } = dataSlice.actions;
export default dataSlice.reducer;
