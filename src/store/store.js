import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import chatReducer from './chatSlice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    chat: chatReducer,
  },
});
