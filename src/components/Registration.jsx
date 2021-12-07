import React, { useRef, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Button,
  Form,
  FloatingLabel,
} from 'react-bootstrap';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import useAuth from '../hooks/index.jsx';
import logo from '../../assets/img/signupIcon.jpg';
import routes from '../routes';

export default () => {
  const { logIn } = useAuth();
  const [isRegistrationFailed, setRegistrationFailed] = useState(false);
  const usernameRef = useRef();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    usernameRef.current.focus();
  }, []);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required(t('common.errors.required'))
        .trim()
        .min(3, t('registration.errors.incorrectNameLength'))
        .max(20, t('registration.errors.incorrectNameLength')),
      password: Yup.string()
        .required(t('common.errors.required'))
        .trim()
        .min(6, t('regisrtation.errors.incorrectPasswordLength')),
      passwordConfirm: Yup.string().required(t('registration.errors.confirm')).when('password', {
        is: (val) => val,
        then: Yup.string().oneOf([Yup.ref('password')], t('registration.errors.passwordsNotEqual')),
      }),
    }),
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.signupPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        navigate('/');
      } catch (e) {
        if (e.isAxiosError && e.response.status === 409) {
          setRegistrationFailed(true);
          return;
        }
        throw e;
      }
    },
  });

  useEffect(() => {
    if (isRegistrationFailed) {
      formik.setErrors({ username: t('registration.errors.duplicatedUsername') });
    }
  }, [isRegistrationFailed]);

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12" md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col md="6" className="col-12 d-flex align-items-center justify-content-center">
                <Image roundedCircle alt="Enter" src={logo} />
              </Col>
              <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={formik.handleSubmit}>
                <h1 className="text-center mb-4">{t('registration.registration')}</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel label={t('common.nickname')} controlId="username">
                    <Form.Control
                      ref={usernameRef}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.username && formik.errors.username}
                      name="username"
                      placeholder={t('common.nickname')}
                    />
                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.username}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel label={t('common.password')} controlId="password">
                    <Form.Control
                      name="password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.password && formik.errors.password}
                      placeholder={t('common.password')}
                    />
                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel label={t('registration.passwordConfirm')} controlId="passwordConfirm">
                    <Form.Control
                      name="passwordConfirm"
                      type="password"
                      value={formik.values.passwordConfirm}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                      placeholder={t('registration.passwordConfirm')}
                    />
                    <Form.Control.Feedback tooltip type="invalid">{formik.errors.passwordConfirm}</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  className="w-100 mb-3"
                >
                  {t('registration.registerMe')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
