import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchChatState } from '../store/chatSlice';
import { 
  selectChannels, 
  selectCurrentChannel, 
  selectChannelMessages, 
  selectCurrentChannelId
} from '../store/chatSlice';
import ChannelsList from './ChannelsList.jsx';
import Messages from './Messages';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatState());
  }, []);
  const channels = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentMessages = useSelector(selectChannelMessages);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
        <Messages currentChannel={currentChannel} currentMessages={currentMessages} />
      </Row>
    </Container>
  );
}