import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { fetchInitData, selectStatus } from '../store/chatSlice';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitData());
  }, []);

  const { t } = useTranslation();
  const chatStatus = 'fetchDataError';

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

  const chatRenderMapping = {
    fetchDataPending: (
      <div className="h-100 d-flex justify-content-center align-items-center">
        <Spinner className="" animation="border" variant="primary" />
      </div>
    ),
    fetchDataSuccess: (
      <>
        <Channels />
        <Messages />
        <ToastContainer />
      </>
    ),
    fetchDataError: <Alert className="mb-0" variant="danger">{t('chat.errors.fetchDataFailed')}</Alert>,
  };

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        {chatRenderMapping[chatStatus]}
      </Row>
    </Container>
  );
};

export default Chat;
