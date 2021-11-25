import React, { useEffect } from 'react';
import { 
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Nav
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import { fetchChatState } from '../store/chatSlice';
import { 
  selectChannels, 
  selectCurrentChannel, 
  selectChannelMessages, 
  selectCurrentChannelId
} from '../store/chatSlice';

const renderChannels = (channels, currentChannelId) => {
  if (channels.length === 0) {
    return null;
  }
  return (
    <Nav className="flex-column px-2" variant="pills" fill>
      {channels.map(({ id, name }) => {
        return (
          <Nav.Item key={id}>
            <button
              className={cn("btn w-100 rounded-0 text-start", {
                "btn-secondary": currentChannelId === id
              })}
             >
             {name}
            </button>
          </Nav.Item>
        );
      })}
    </Nav>
  );
}

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchChatState());
  }, []);
  const channels = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const currentChannelId = useSelector(selectCurrentChannelId);
  const currentMessages = useSelector(selectChannelMessages);
  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 border-end pt-5 px-0 bg-light" md="2" >
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Channels</span>
            <button className="btn text-primary p-0 btn-group-vertical">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          {renderChannels(channels, currentChannelId)}
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">{currentChannel?.name ?? ''}</p>
              <span className="text-muted">{currentMessages.length}</span>
            </div>
            <div className="chat-messages overflow-auto px-5" id="messages-box">
              {currentMessages.map(({ id, author, text }) => {
                return (
                  <div key={id} className="text-break mb-2">
                    {<b>{author}</b>}
                    {`: ${text}`}
                  </div>
                )
              })}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form noValidate className="py-1 border rounder-2">
                <InputGroup hasValidation>
                  <Form.Control 
                    className="border-0 p-0 ps-2 form-control"
                    type="text"
                    placeholder="Enter a message..."
                    name="body"
                    aria-label="New message"
                  />
                  <div className="input-group-append">
                    <button disabled type="submit" className="btn btn-group-vertical">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"></path>
                      </svg>
                      <span className="visually-hidden">Send</span>
                    </button>
                  </div>
                </InputGroup>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}