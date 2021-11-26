import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchChatState = createAsyncThunk('chat/fetchChatState', async () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const response = await axios.get(routes.chatDataPath(), {
    headers: { "authorization": `Bearer ${token}` }
  });
  return response.data;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    status: 'init',
    channels: [],
    messages: [],
    currentChannelId: null,
    error: null,
  },
  reducers: {
    addNewMessage(state, action) {
      state.status = 'sendingMessageSuccess';
      state.messages.push(action.payload);
    },
    handleConnectionError(state, action) {
      state.status = 'websocketConnectionError';
      state.error = action.payload;
    },
    setSendingMessageStatus(state) {
      state.status = 'sendingMessage';
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchChatState.pending, (state) => {
        state.status = 'fetchingChatData';
      })
      .addCase(fetchChatState.fulfilled, (state, action) => {
        state.status = 'fetchingChatDataSuccess';
        state.channels = [...state.channels, ...action.payload.channels];
        state.messages = [...state.messages, ...action.payload.messages];
        state.currentChannelId = action.payload.currentChannelId;
      })
      .addCase(fetchChatState.rejected, (state, action) => {
        state.status = 'fetchingChatDataError';
        state.error = action.error.message;
      })
  } 
});

export const { 
  addNewMessage, 
  handleConnectionError,
  setSendingMessageStatus,
} = chatSlice.actions;

export const selectStatus = (state) => state.status;
export const selectChannels = (state) => state.channels;
export const selectCurrentChannel = (state) => state.channels.find(({ id }) => id === state.currentChannelId);
export const selectCurrentChannelId = (state) => state.currentChannelId;
export const selectChannelMessages = (state) => state.messages.filter(({ channelId }) => channelId === state.currentChannelId); 

export default chatSlice.reducer;