import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import SocketContext from '../contexts/SocketContext';
import { 
  changeCurrentChannel, 
  selectDefaultChannel,
  setStatus as setChatStatus,
} from '../store/chatSlice';
import { 
  addMessage, 
  setStatus as setMessagesStatus,
  deleteChannelMessages,
} from '../store/messagesSlice';
import { 
  addChannel, 
  setStatus as setChannelsStatus, 
  renameChannel,
  deleteChannel,
 } from '../store/channelsSlice';

export default ({ children }) => {
  const [error, setError] = useState(null);
  const socket = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    socket.current = io();
    socket.current.on('connect', () => {
      console.log('websocket has been connected!');
    });
    socket.current.on('connect_error', () => {
      console.log('connection error');
      setError(t('socket.errors.connectionErr'));
    });
    socket.current.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.current.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(changeCurrentChannel(channel.id));
      dispatch(setChatStatus('addChannelSuccess'));
    });
    socket.current.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
      dispatch(setChatStatus('renameChannelSuccess'));
    });
    socket.current.on('removeChannel', (channel) => {
      dispatch(deleteChannel(channel));
      dispatch(deleteChannelMessages(channel));
      dispatch(selectDefaultChannel())
      dispatch(setChatStatus('removeChannelSuccess'));
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
        setChatStatus('sendMessageError');
      }
    });
  };

  const createChannel = (channel) => {
    dispatch(setChannelsStatus('sending'));
    socket.current.emit('newChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('createChannelError');
      }
    });
  };

  const changeChannelName = (channelData) => {
    dispatch(setChannelsStatus('sending'));
    socket.current.emit('renameChannel', channelData, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('renameChannelError');
      }
    });
  };

  const removeChannel = (channel) => {
    dispatch(setChannelsStatus('sending'));
    socket.current.emit('removeChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('removeChannelError');
      }
    });
  };

  if (error) {
    return <Alert variant="danger">{`Error: ${error}`}</Alert>
  }

  return (
    <SocketContext.Provider value={{ 
      sendMessage, 
      createChannel, 
      changeChannelName,
      removeChannel,
      }}>
      {children}
    </SocketContext.Provider>
  );
}