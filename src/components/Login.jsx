import React, { useEffect, useState, useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Image, Button, Form, FloatingLabel } from 'react-bootstrap';

import routes from '../routes';
import useAuth from '../hooks/index.jsx';
import logo from '../../assets/img/loginIcon.jpeg';

export default () =>  {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const usernameRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
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
    }
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
                <h1 className="text-center mb-4">Enter</h1>
                <Form.Group className="mb-3" controlId="username">
                  <FloatingLabel label="Your nickname">
                    <Form.Control ref={usernameRef} onChange={formik.handleChange} isInvalid={authFailed} name="username" id="username" placeholder="Your nickname" required />
                  </FloatingLabel>
                </Form.Group>
                <Form.Group className="mb-4" controlId="password">
                  <FloatingLabel label="Your password">
                    <Form.Control name="password" onChange={formik.handleChange} isInvalid={authFailed} id="password" placeholder="Your password" required />
                    <Form.Control.Feedback tooltip type="invalid">Wrong username or password</Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Enter</Button>
              </Form>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Don't have an account?</span>
                <Link to="/signup">Registration</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
};