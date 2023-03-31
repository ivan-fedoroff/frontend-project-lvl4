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

    backupMessages: (state, { payload }) => {
      state.channelsData.messagesBackup = { ...state.channelsData.messagesBackup, ...payload };
    },

    setActiveChannel: (state, { payload }) => {
      const { messagesBackup } = state.channelsData;
      const messages = messagesBackup[payload.id] ? messagesBackup[payload.id].messages : [];
      state.channelsData.currentChannelId = payload.id;
      state.channelsData.messages = messages;
    },
  },
});

export const {
  mountData, refreshMessages, backupMessages, setActiveChannel,
} = dataSlice.actions;
export default dataSlice.reducer;
