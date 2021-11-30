import { 
  createSlice,
  createEntityAdapter, 
  createSelector
} from '@reduxjs/toolkit';

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
    setStatus: (state, action) => {
      state.status = action.payload;
    }
  },
});

export default channelsSlice.reducer;

export const { addChannels, addChannel, setStatus } = channelsSlice.actions;

export const { selectAll: selectChannels, selectById: selectChannelById } =
  channelsAdapter.getSelectors(state => state.channels);

export const selectCurrentChannel = createSelector(
  selectChannels,
  state => state.chat.currentChannelId,
  (channels, currentChannelId) => channels.find(({ id }) => id === currentChannelId)
);

export const selectChannelsNames = createSelector(
  selectChannels,
  (channels) => channels.map(({ name }) => name)
);

export const selectStatus = state => state.channels.status;


