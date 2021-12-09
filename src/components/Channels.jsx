import React, { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Col,
  Nav,
  Dropdown,
  Button,
  ButtonGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import SocketContext from '../contexts/SocketContext';
import {
  selectChannels,
  selectCurrentChannel,
  selectStatus,
  selectModal as selectCurrentModal,
  setModalInfo,
} from '../store/channelsSlice';
import selectModal from './modals';

export default ({ selectChannel }) => {
  const modalInfo = useSelector(selectCurrentModal);
  const dispatch = useDispatch();
  const openModal = (info) => dispatch(setModalInfo(info));
  const closeModal = () => dispatch(setModalInfo({}));
  const currentStatus = useSelector(selectStatus);
  const { t } = useTranslation();
  useEffect(() => {
    if (currentStatus === 'sendingSuccess') {
      closeModal();
    }
  }, [currentStatus]);

  const channels = useSelector(selectChannels);
  const currentChannel = useSelector(selectCurrentChannel);
  const {
    createChannel,
    changeChannelName,
    removeChannel,
  } = useContext(SocketContext);

  const renderModal = (modal) => {
    if (!modal.type) {
      return null;
    }
    const submitHandlers = {
      adding: createChannel,
      remove: removeChannel,
      rename: changeChannelName,
    };

    const Component = selectModal(modal.type);
    return (
      <Component
        onHide={closeModal}
        handleSubmit={submitHandlers[modal.type]}
        item={modal.item}
      />
    );
  };

  const getVariant = (id) => (currentChannel?.id === id ? 'secondary' : '');

  const renderButton = (id, name) => (
    <Button
      className="w-100 rounded-0 text-start text-truncate"
      variant={getVariant(id)}
      onClick={() => selectChannel(id)}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  const renderDropdown = (id, name) => (
    <Dropdown className="d-flex" as={ButtonGroup} variant={getVariant(id)}>
      {renderButton(id, name)}
      <Dropdown.Toggle variant={getVariant(id)} split aria-haspopup>
        <span className="visually-hidden">{t('modals.common.channelControl')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#" onClick={() => openModal({ type: 'remove', item: id })}>{t('channels.delete')}</Dropdown.Item>
        <Dropdown.Item href="#" onClick={() => openModal({ type: 'rename', item: id })}>{t('channels.rename')}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  const renderChannels = () => {
    if (channels.length === 0) {
      return null;
    }
    return (
      <Nav className="flex-column px-2" variant="pills" fill>
        {channels.map(({ id, name, removable }) => (
          <Nav.Item className="w-100" key={id}>
            {removable ? renderDropdown(id, name) : renderButton(id, name)}
          </Nav.Item>
        ))}
      </Nav>
    );
  };

  return (
    <Col className="col-4 border-end pt-5 px-0 bg-light" md="2">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channels.channels')}</span>
        <button type="button" className="btn text-primary p-0 btn-group-vertical" onClick={() => openModal({ type: 'adding' })}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {renderChannels()}
      {renderModal(modalInfo)}
    </Col>
  );
};
