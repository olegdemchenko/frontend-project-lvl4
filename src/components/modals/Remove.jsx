import React, { useState } from "react";
import { Modal, Button } from 'react-bootstrap';

export default ({ onHide, handleSubmit, item }) => {
  const [status, setStatus] = useState('filling');
  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Are you sure?</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" type="button" className="me-2" onClick={onHide}>Cancel</Button>
          <Button
            variant="danger"
            type="submit"
            onClick={() => {
              handleSubmit({ id: item });
              setStatus('sending');
            }}
            disabled={status === 'sending'}
          >Delete</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};