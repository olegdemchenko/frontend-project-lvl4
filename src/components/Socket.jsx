import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SocketContext from '../contexts/SocketContext';
import useSocket from '../hooks/useSocket';

const Socket = ({ socket, children }) => {
  const [error, setError] = useState(null);
  const [notification, notify] = useState(null);
  const socketFunctions = useSocket(socket, notify, setError);
  const { t } = useTranslation();

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

  if (error) {
    return <Alert variant="danger">{`Error: ${error}`}</Alert>;
  }

  return (
    <SocketContext.Provider value={{ ...socketFunctions }}>
      {children}
      <ToastContainer />
    </SocketContext.Provider>
  );
};

export default Socket;
