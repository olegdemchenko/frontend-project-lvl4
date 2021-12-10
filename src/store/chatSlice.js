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
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
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
      .addCase(fetchInitData.fulfilled, (state) => {
        state.status = 'fetchDataSuccess';
      })
      .addCase(fetchInitData.rejected, (state) => {
        state.status = 'fetchDataError';
      });
  },
});

export default chatSlice.reducer;

export const {
  setStatus,
  reset,
} = chatSlice.actions;

export const selectStatus = (state) => state.chat.status;
