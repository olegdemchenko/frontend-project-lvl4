import React, { useEffect } from 'react';
import { Container, Row, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { fetchInitData, selectStatus, changeCurrentChannel } from '../store/chatSlice';

import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchInitData())
  }, []);
  
  const chatStatus = useSelector(selectStatus);
  if (chatStatus.includes('error')) {
    return <Alert variant="danger">Oops! Something went wrong. Please try again later</Alert>
  }

  const selectChannel = (channelId) => {
    dispatch(changeCurrentChannel(channelId));
  };
 
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels selectChannel={selectChannel} />
        <Messages />
      </Row>
    </Container>
  );
}