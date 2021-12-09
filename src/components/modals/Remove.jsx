import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Remove = ({ onHide, handleSubmit, item }) => {
  const [status, setStatus] = useState('filling');
  const { t } = useTranslation();
  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.delete.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modals.delete.sure')}</p>
        <div className="d-flex justify-content-end">
          <Button
            variant="secondary"
            type="button"
            className="me-2"
            onClick={onHide}
          >
            {t('modals.common.cancel')}
          </Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              handleSubmit({ id: item });
              setStatus('sending');
            }}
            disabled={status === 'sending'}
          >
            {t('modals.delete.delete')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
