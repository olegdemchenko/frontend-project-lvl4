/* eslint-disable no-param-reassign */
import {
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchInitData = createAsyncThunk('chat/fetchInitData', async () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const {
    data: { channels, messages, currentChannelId },
  } = await axios.get(routes.chatDataPath(), {
    headers: { authorization: `Bearer ${token}` },
  });
  return { channels, messages, currentChannelId };
});

const initialState = {
  status: 'idle',
  defaultChannelId: null,
  currentChannelId: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    selectDefaultChannel(state) {
      state.currentChannelId = state.defaultChannelId;
    },
    changeCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    reset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitData.pending, (state) => {
        state.status = 'fetchDataPending';
      })
      .addCase(fetchInitData.fulfilled, (state, action) => {
        state.status = 'fetchDataSuccess';
        state.currentChannelId = action.payload.currentChannelId;
        state.defaultChannelId = action.payload.currentChannelId;
      })
      .addCase(fetchInitData.rejected, (state) => {
        state.status = 'fetchDataError';
      });
  },
});

export default chatSlice.reducer;

export const {
  setStatus,
  changeCurrentChannel,
  selectDefaultChannel,
  reset,
} = chatSlice.actions;

export const selectCurrentChannelId = (state) => state.chat.currentChannelId;

export const selectStatus = (state) => state.chat.status;
