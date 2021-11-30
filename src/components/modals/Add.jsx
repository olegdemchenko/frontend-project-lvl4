import React, { useRef, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { selectChannelsNames, selectStatus } from '../../store/channelsSlice';

export default ({ onHide, handleSubmit }) => {
  const inputRef = useRef();
  const existingChannels = useSelector(selectChannelsNames);
  const chatStatus = useSelector(selectStatus);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required().notOneOf(existingChannels)
    }),
    onSubmit: ({ name }) => {
      handleSubmit({ name });
    }
  });
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add channel</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control 
              aria-label="channel name"
              className="mb-2"
              ref={inputRef}
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={formik.errors.name}
              disabled={chatStatus === 'addingChannel'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" type="button" className="me-2" onClick={onHide}>Cancel</Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={chatStatus === 'addingChannel'}
              >Add</Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};