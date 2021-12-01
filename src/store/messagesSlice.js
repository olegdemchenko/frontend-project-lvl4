import {
  createSlice, 
  createEntityAdapter,  
  createSelector
} from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
  status: 'pending',
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      addMessages: messagesAdapter.addMany,
      addMessage: messagesAdapter.addOne,
      deleteChannelMessages: (state, action) => {
        const channelMessagesIds = Object.values(state.entities)
          .filter(({ channelId }) => channelId === action.payload.id)
          .map(({ id }) => id);
        messagesAdapter.removeMany(state, channelMessagesIds);
      },
      setStatus: (state, action) => {
        state.status = action.payload;
      }
    },
  });

  export default messagesSlice.reducer;

  export const { 
    addMessage,
    addMessages, 
    setStatus,
    deleteChannelMessages, 
  } = messagesSlice.actions;

  export const { selectAll: selectMessages, selectById: selectMessageById } =
    messagesAdapter.getSelectors(state => state.messages);
  
  export const selectCurrentMessages = createSelector(
    selectMessages,
    state => state.chat.currentChannelId,
    (messages, currentChannelId) => messages.filter(({ channelId }) => channelId === currentChannelId)
  );

  export const selectStatus = state => state.messages.status;


