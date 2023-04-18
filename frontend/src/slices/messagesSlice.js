import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import { actions as channelsActions } from './channelsSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    /* eslint-disable functional/no-expression-statements */
    builder.addCase(channelsActions.removeChannel, (state, action) => {
      const id = action.payload;
      const restEntities = Object.values(state.entities).filter((e) => e.channelId === id);
      messagesAdapter.setAll(state, restEntities);
    });
    /* eslint-enable */
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
