import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SocketContext from '../contexts/SocketContext';
import {
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
  setCurrentChannel,
  setDefaultChannel,
} from '../store/channelsSlice';

const Socket = ({ socket, children }) => {
  const [error, setError] = useState(null);
  const [notification, notify] = useState(null);
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
      dispatch(setCurrentChannel(channel.id));
      notify('addChannelSuccess');
    });
    socket.on('renameChannel', (channel) => {
      dispatch(renameChannel(channel));
      notify('renameChannelSuccess');
    });
    socket.on('removeChannel', (channel) => {
      dispatch(deleteChannel(channel));
      dispatch(deleteChannelMessages(channel));
      dispatch(setDefaultChannel());
      notify('removeChannelSuccess');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const notificationsMap = {
    addChannelSuccess: t('chat.addChannelSuccess'),
    addChannelError: t('chat.errors.addChannelError'),
    renameChannelSuccess: t('chat.renameChannelSuccess'),
    renameChannelError: t('chat.errors.renameChannelError'),
    removeChannelSuccess: t('chat.removeChannelSuccess'),
    removeChannelError: t('chat.errors.removeChannelError'),
    sendMessageError: t('chat.errors.sendMessageError'),
  };

  useEffect(() => {
    if (notificationsMap[notification]) {
      const notificationType = notification.includes('error') ? 'error' : 'success';
      toast[notificationType](notificationsMap[notification], {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [notification]);

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
      <ToastContainer />
    </SocketContext.Provider>
  );
};

export default Socket;
