import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';

import routes from '../routes';
import useAuth from '../hooks/index.jsx';
import logo from '../../assets/img/loginIcon.jpeg';

export default () => {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const usernameRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const { data } = await axios.post(routes.loginPath(), { username, password });
        localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        const from = location.state?.from?.pathname ?? '/';
        navigate(from);
      } catch (e) {
        if (e.isAxiosError && e.response.status === 401) {
          setAuthFailed(true);
          return;
        }
        throw e;
      }
    },
  });

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
                <h1 className="text-center mb-4">{t('login.enter')}</h1>
                <Form.Group className="mb-3">
                  <FloatingLabel label={t('common.nickname')} controlId="username">
                    <Form.Control
                      ref={usernameRef}
                      onChange={formik.handleChange}
                      isInvalid={authFailed}
                      name="username"
                      placeholder={t('common.nickname')}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4">
                  <FloatingLabel label={t('common.password')} controlId="password">
                    <Form.Control
                      type="password"
                      name="password"
                      onChange={formik.handleChange}
                      isInvalid={authFailed}
                      placeholder={t('common.password')}
                      required
                    />
                    {authFailed && <Form.Control.Feedback tooltip type="invalid">{t('login.errors.wrongCredentials')}</Form.Control.Feedback>}
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">{t('login.enter')}</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.noAccount')}</span>
                <Link to="/signup">{t('registration.registration')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
