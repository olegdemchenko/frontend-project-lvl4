import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import SocketContext from '../contexts/SocketContext';
import { changeCurrentChannel } from '../store/chatSlice';
import { addMessage, setStatus as setMessagesStatus } from '../store/messagesSlice';
import { addChannel, setStatus as setChannelsStatus } from '../store/channelsSlice';

export default ({ children }) => {
  const [error, setError] = useState(null);
  const socket = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.current = io();
    socket.current.on('connect', () => {
      console.log('websocket has been connected!');
    });
    socket.current.on('connect_error', () => {
      console.log('connection error');
      setError('Websocket connection error');
    });
    socket.current.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.current.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(changeCurrentChannel(channel.id));
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    dispatch(setMessagesStatus('sending'));
    socket.current.emit('newMessage', message, ({ status }) => {
      if (status === 'ok') {
        dispatch(setMessagesStatus('sendingSuccess'));
      } else {
        setError('sending message error');
      }
    });
  };

  const createChannel = (channel) => {
    dispatch(setChannelsStatus('sending'));
    socket.current.emit('newChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setError('sending message error');
      }
    });
  }

  if (error) {
    return <Alert variant="danger">{`Error: ${error}`}</Alert>
  }

  return (
    <SocketContext.Provider value={{ sendMessage, createChannel }}>
      {children}
    </SocketContext.Provider>
  );
}