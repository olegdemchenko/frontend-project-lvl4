import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
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

export default ({ socket, children }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  useEffect(() => {
    socket.on('connect', () => {
      console.log('websocket has been connected!');
    });
    socket.on('connect_error', () => {
      console.log('connection error');
      setError(t('socket.errors.connectionErr'));
    });
    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });
    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
      dispatch(changeCurrentChannel(channel.id));
      dispatch(setChatStatus('addChannelSuccess'));
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
      dispatch(setChatStatus('renameChannelSuccess'));
    });
    socket.on('removeChannel', (channel) => {
      dispatch(deleteChannel(channel));
      dispatch(deleteChannelMessages(channel));
      dispatch(selectDefaultChannel());
      dispatch(setChatStatus('removeChannelSuccess'));
    });
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    dispatch(setMessagesStatus('sending'));
    socket.emit('newMessage', message, ({ status }) => {
      if (status === 'ok') {
        dispatch(setMessagesStatus('sendingSuccess'));
      } else {
        setChatStatus('sendMessageError');
      }
    });
  };

  const createChannel = (channel) => {
    dispatch(setChannelsStatus('sending'));
    socket.emit('newChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('createChannelError');
      }
    });
  };

  const changeChannelName = (channelData) => {
    dispatch(setChannelsStatus('sending'));
    socket.emit('renameChannel', channelData, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('renameChannelError');
      }
    });
  };

  const removeChannel = (channel) => {
    dispatch(setChannelsStatus('sending'));
    socket.emit('removeChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(setChannelsStatus('sendingSuccess'));
      } else {
        setChatStatus('removeChannelError');
      }
    });
  };

  if (error) {
    return <Alert variant="danger">{`Error: ${error}`}</Alert>;
  }

  return (
    <SocketContext.Provider value={{
      sendMessage,
      createChannel,
      changeChannelName,
      removeChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};
