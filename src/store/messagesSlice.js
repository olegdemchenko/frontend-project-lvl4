import {
  createSlice, 
  createEntityAdapter,  
  createSelector
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      addMessages: messagesAdapter.addMany,
      addMessage: messagesAdapter.addOne,
    },
  });

  export default messagesSlice.reducer;

  export const { addMessage, addMessages } = messagesSlice.actions;

  export const { selectAll: selectMessages, selectById: selectMessageById } =
    messagesAdapter.getSelectors(state => state.messages);
  
  export const selectCurrentMessages = createSelector(
    selectMessages,
    state => state.chat.currentChannelId,
    (messages, currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId)
  );


