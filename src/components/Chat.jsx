import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInitData, selectStatus } from '../store/chatSlice';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const Chat = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitData());
  }, []);

  const { t } = useTranslation();
  const chatStatus = useSelector(selectStatus);

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
