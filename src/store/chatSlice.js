import { 
  createSlice,
  createAsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

import store from './store';
import { addMessages } from './messagesSlice';
import { addChannels } from './channelsSlice';

export const fetchInitData = createAsyncThunk('chat/fetchInitData', async () => {
  const { token } = JSON.parse(localStorage.getItem('userId'));
  const { data: { channels, messages, currentChannelId } } = await axios.get(routes.chatDataPath(), {
    headers: { "authorization": `Bearer ${token}` }
  });
  store.dispatch(addMessages(messages));
  store.dispatch(addChannels(channels));
  return currentChannelId;
});

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    status: 'idle',
    errorMessage: null,
    currentChannelId: null,
  },
  reducers: {
    changeCurrentChannel(state, action) {
      state.currentChannelId = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.status = 'error'
      state.errorMessage = action.payload.message;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInitData.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchInitData.fulfilled, (state, action) => {
        state.status = 'success';
        state.currentChannelId = action.payload;
      })
      .addCase(fetchInitData.rejected, (state, action) => {
        state.status = 'error';
        state.errorMessage = action.error.message;
      });
  }
});

export default chatSlice.reducer;

export const { setStatus, setError, changeCurrentChannel } = chatSlice.actions;

export const selectCurrentChannelId = state => state.chat.currentChannelId;

export const selectStatus = state => state.chat.status;