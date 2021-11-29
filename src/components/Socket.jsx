import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';

import SocketContext from '../contexts/SocketContext';
import { addMessage } from '../store/messagesSlice';

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
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    socket.current.emit('newMessage', message, ({ status }) => {
      if (status !== 'ok') {
        setError('sending message error');
      }
    });
  };

  if (error) {
    return <Alert variant="danger">{`Error: ${error}`}</Alert>
  }

  return (
    <SocketContext.Provider value={{ sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
}