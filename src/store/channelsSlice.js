import { 
  createSlice,
  createEntityAdapter, 
  createSelector
} from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels: channelsAdapter.addMany,
  },
});

export default channelsSlice.reducer;

export const { addChannels } = channelsSlice.actions;

export const { selectAll: selectChannels, selectById: selectChannelById } =
  channelsAdapter.getSelectors(state => state.channels);

export const selectCurrentChannel = createSelector(
  selectChannels,
  state => state.chat.currentChannelId,
  (channels, currentChannelId) => channels.find(({ id }) => id === currentChannelId)
);



