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
  currentChannelId: null,
  defaultChannelId: null,
  modal: {},
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    setModalInfo: (state, action) => {
      state.modal = action.payload;
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = action.payload;
    },
    setDefaultChannel: (state) => {
      state.currentChannelId = state.defaultChannelId;
    },
    renameChannel: channelsAdapter.upsertOne,
    deleteChannel: (state, action) => {
      channelsAdapter.removeOne(state, action.payload.id);
    },
    setChannelsStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitData.fulfilled, (state, action) => {
        channelsAdapter.addMany(state, action.payload.channels);
        state.currentChannelId = action.payload.currentChannelId;
        state.defaultChannelId = action.payload.currentChannelId;
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
  setChannelsStatus,
  setModalInfo,
  setCurrentChannel,
  setDefaultChannel,
} = channelsSlice.actions;

export const {
  selectAll: selectChannels,
  selectById: selectChannelById,
} = channelsAdapter.getSelectors((state) => state.channels);

export const selectChannelsNames = createSelector(
  selectChannels,
  (channels) => channels.map(({ name }) => name),
);

export const selectCurrentChannel = createSelector(
  selectChannels,
  (state) => state.channels.currentChannelId,
  (channels, currentChannelId) => channels.find(({ id }) => id === currentChannelId),
);

export const selectStatus = (state) => state.channels.status;

export const selectModal = (state) => state.channels.modal;
