import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import {
  setChatStatus,
} from '../store/chatSlice';
import {
  addMessage,
  setMessagesStatus,
  deleteChannelMessages,
} from '../store/messagesSlice';
import {
  addChannel,
  setChannelsStatus,
  renameChannel,
  deleteChannel,
  setCurrentChannel,
  setDefaultChannel,
} from '../store/channelsSlice';

const useSocket = (socket, notify, setError) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

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
  return {
    sendMessage,
    createChannel,
    changeChannelName,
    removeChannel,
  };
};

export default useSocket;
