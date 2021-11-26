import React, { useEffect, useRef } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';

import { fetchChatState } from '../store/chatSlice';
import { 
  selectStatus,
  selectChannels, 
  selectCurrentChannel, 
  selectChannelMessages, 
  selectCurrentChannelId,
  addNewMessage,
  handleConnectionError,
  setSendingMessageStatus,
} from '../store/chatSlice';
import ChannelsList from './ChannelsList.jsx';
import Messages from './Messages.jsx';

export default () => {
  const dispatch = useDispatch();
  const socket = useRef(null);
  useEffect(() => {
    dispatch(fetchChatState());
  }, []);

  useEffect(() => {
    socket.current = io();
    socket.current.on('connect', () => {
      console.log('websocket has been connected!');
    });
    socket.current.on('connect_error', () => {
      console.log('connection error');
      dispatch(handleConnectionError('Websocket connection error'));
    });
    socket.current.on('newMessage', (message) => {
      dispatch(addNewMessage(message));
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    dispatch(setSendingMessageStatus('sendingMessage'));
    socket.current.emit('newMessage', message, ({ status }) => {
      if (status === 'ok') {
        dispatch(setSendingMessageStatus('sendingMessageSuccess'));
      } else {
        dispatch(handleConnectionError('Problem with sending message'));
      }
    });
  };
  const chatStatus = useSelector(selectStatus);
  if (chatStatus.includes('error')) {
    return <Alert variant="danger">Oops! Something went wrong. Please try again later</Alert>
  }

  const channels = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentMessages = useSelector(selectChannelMessages);
  const { username } = JSON.parse(localStorage.getItem('userId')); 

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <ChannelsList channels={channels} currentChannelId={currentChannelId} />
        <Messages 
          username={username}
          chatStatus={chatStatus}
          sendMessage={sendMessage} 
          currentChannel={currentChannel} 
          currentMessages={currentMessages} 
        />
      </Row>
    </Container>
  );
}