/* eslint-disable no-param-reassign */
import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { fetchInitData, reset } from './chatSlice';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  status: 'pending',
});

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.setOne,
    deleteChannelMessages: (state, action) => {
      const channelMessagesIds = Object.values(state.entities)
        .filter(({ channelId }) => channelId === action.payload.id)
        .map(({ id }) => id);
      messagesAdapter.removeMany(state, channelMessagesIds);
    },
    setMessagesStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitData.fulfilled, (state, action) => {
        messagesAdapter.addMany(state, action.payload.messages);
      })
      .addCase(reset, () => initialState);
  },
});

export default messagesSlice.reducer;

export const {
  addMessage,
  addMessages,
  setMessagesStatus,
  deleteChannelMessages,
} = messagesSlice.actions;

export const {
  selectAll: selectMessages,
  selectById: selectMessageById,
} = messagesAdapter.getSelectors((state) => state.messages);

export const selectCurrentMessages = createSelector(
  selectMessages,
  (state) => state.channels.currentChannelId,
  (messages,
    currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId),
);

export const selectStatus = (state) => state.messages.status;
