import React, {
  useState,
  useRef,
  useEffect,
  useContext,
} from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

import { selectChannelsNames } from '../../store/channelsSlice';
import DictionaryFilterContext from '../../contexts/DictionaryFilterContext';

export default ({ onHide, handleSubmit }) => {
  const [status, setStatus] = useState('filling');
  const inputRef = useRef();
  const existingChannels = useSelector(selectChannelsNames);
  const { t } = useTranslation();
  const { filter } = useContext(DictionaryFilterContext);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(t('common.errors.required'))
        .notOneOf(existingChannels, t('modals.common.errors.unique'))
        .test(
          'profanity-test',
          t('modals.common.errors.badLanguage'),
          (value) => !filter.check(value),
        ),
    }),
    onSubmit: ({ name }) => {
      handleSubmit({ name });
      setStatus('sending');
    },
  });
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <Modal show centered onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.addChannel')}</Modal.Title>
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
              disabled={status === 'sending'}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
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
                variant="primary"
                type="submit"
                disabled={status === 'sending'}
              >
                {t('modals.common.send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
