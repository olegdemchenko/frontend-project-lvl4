import React, { useRef, useEffect, useContext } from 'react';
import { Col, Form, InputGroup } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';

import SocketContext from '../contexts/SocketContext';
import { selectCurrentMessages, selectStatus } from '../store/messagesSlice';
import { selectCurrentChannel } from '../store/channelsSlice';


export default () => {
  const status = useSelector(selectStatus);
  const currentChannel = useSelector(selectCurrentChannel);
  const currentMessages = useSelector(selectCurrentMessages);
  const { sendMessage } = useContext(SocketContext);
  const { username } = JSON.parse(localStorage.getItem('userId')); 
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: ''
    },
    onSubmit: ({ message }, { resetForm }) => {
      sendMessage({ channelId: currentChannel.id, username, message });
      resetForm({ message: '' });
    }
  });
  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b>{`# ${(currentChannel?.name ?? '')}`}</b></p>
          <span className="text-muted">
            {currentMessages.length === 1 ? '1 message' : `${currentMessages.length} messages`}
          </span>
        </div>
        <div className="chat-messages overflow-auto px-5" id="messages-box">
          {currentMessages.map(({ id, username, message }) => {
            return (
              <div key={id} className="text-break mb-2">
                {<b>{username}</b>}
                {`: ${message}`}
              </div>
            )
          })}
        </div>
        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounder-2">
            <InputGroup hasValidation>
              <Form.Control
                ref={inputRef}
                className="border-0 p-0 ps-2 form-control"
                type="text"
                placeholder="Enter a message..."
                name="message"
                aria-label="New message"
                value={formik.values.message}
                onChange={formik.handleChange}
                disabled={status === 'sending'}
              />
              <div className="input-group-append">
                <button type="submit" className="btn btn-group-vertical" disabled={status === 'sending'}>
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
  );
}