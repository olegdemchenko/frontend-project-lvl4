import React, { useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchInitData, selectStatus, changeCurrentChannel } from '../store/chatSlice';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitData());
  }, []);

  const { t } = useTranslation();
  const chatStatus = useSelector(selectStatus);
  if (chatStatus === 'fetchDataError') {
    return <Alert variant="danger">{t('chat.errors.fetchDataFailed')}</Alert>;
  }

  const chatNotificationsMap = {
    addChannelSuccess: t('chat.addChannelSuccess'),
    addChannelError: t('chat.errors.addChannelError'),
    renameChannelSuccess: t('chat.renameChannelSuccess'),
    renameChannelError: t('chat.errors.renameChannelError'),
    removeChannelSuccess: t('chat.removeChannelSuccess'),
    removeChannelError: t('chat.errors.removeChannelError'),
    sendMessageError: t('chat.errors.sendMessageError'),
  };

  useEffect(() => {
    if (chatNotificationsMap[chatStatus]) {
      const notificationType = chatStatus.includes('error') ? 'error' : 'success';
      toast[notificationType](chatNotificationsMap[chatStatus], {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }, [chatStatus]);

  const selectChannel = (channelId) => {
    dispatch(changeCurrentChannel(channelId));
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels selectChannel={selectChannel} />
        <Messages />
        <ToastContainer />
      </Row>
    </Container>
  );
};
