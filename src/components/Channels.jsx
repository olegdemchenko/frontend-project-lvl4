import React, { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Col, Nav } from 'react-bootstrap';
import cn from 'classnames';

import SocketContext from '../contexts/SocketContext';
import { selectChannels, selectCurrentChannel } from '../store/channelsSlice';
import selectModal from './modals';

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }
  const Component = selectModal(modalInfo.type);
  return <Component onHide={hideModal} handleSubmit={modalInfo.onSubmit}/>
};

export default ({ selectChannel }) => {
  const channels = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const { createChannel } = useContext(SocketContext);
  const [modalInfo, setModalInfo] = useState({ type: null, onSubmit: null, item: null });
  const openModal = (info) => setModalInfo(info);
  const closeModal = () => setModalInfo({ type: null, item: null });

  const renderChannels = () => {
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
                  "btn-secondary": currentChannel?.id === id
                })}
                onClick={() => selectChannel(id)}
              >
              {`# ${name}`}
              </button>
            </Nav.Item>
          );
        })}
      </Nav>
    );
  };

  return (
    <Col className="col-4 border-end pt-5 px-0 bg-light" md="2" >
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>Channels</span>
        <button className="btn text-primary p-0 btn-group-vertical" onClick={() => openModal({ type:'adding', onSubmit: createChannel })}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {renderChannels()}
      {renderModal(modalInfo, closeModal)}
    </Col>
  );
}