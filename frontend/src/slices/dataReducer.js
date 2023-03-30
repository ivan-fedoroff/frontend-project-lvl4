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

    refreshMessages: (state, { payload }) => {
      const { messages } = state.channelsData;
      const getNewMessageIndex = () => messages.findIndex((message) => message.id === payload.id);
      state.channelsData.messages = getNewMessageIndex() === -1 ? [...messages, payload] : messages;
    },
  },
});

export const { mountData, refreshMessages } = dataSlice.actions;
export default dataSlice.reducer;
