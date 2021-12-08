/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { fetchInitData, reset } from './chatSlice';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  status: 'pending',
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    renameChannel: channelsAdapter.upsertOne,
    deleteChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id);
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
      })
      .addCase(reset, () => initialState);
  },
});

export default channelsSlice.reducer;

export const {
  addChannels,
  addChannel,
  renameChannel,
  deleteChannel,
  setStatus,
} = channelsSlice.actions;

export const {
  selectAll: selectChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentChannel = createSelector(
  selectChannels,
  (state) => state.chat.currentChannelId,
  (channels, currentChannelId) => channels.find(({ id }) => id === currentChannelId),
);

export const selectChannelsNames = createSelector(
  selectChannels,
  (channels) => channels.map(({ name }) => name),
);

export const selectStatus = (state) => state.channels.status;
