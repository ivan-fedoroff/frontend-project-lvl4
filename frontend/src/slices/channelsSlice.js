import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.setOne,
    removeChannel: channelsAdapter.removeOne,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
