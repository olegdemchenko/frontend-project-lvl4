import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import routes from '../routes';
import useAuth from '../hooks/index.jsx';
import logo from '../../assets/img/loginIcon.jpeg';
import TextInput from './TextInput';

export default () =>  {
  const { logIn } = useAuth();
  const [authFailed, setAuthFailed] = useState(false);
  const usernameRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const UserNameWithRef = React.forwardRef((props, ref) => {
    return (
      <TextInput 
        label="Your nickname"
        name="username"
        id="username"
        placeholder="Your nickname"
        type="text"
        forwardedRef={ref}
        isInvalid={authFailed}
        required
      />
    );
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xx-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rounded-circle" alt="Enter" src={logo}/>  
              </div>
              <Formik 
                initialValues={{
                  username: '',
                  password: ''
                }}
                /* TODO Move this validation to registration process
                  validationSchema={Yup.object({
                  login: Yup.string().min(4, 'Login should contain at least 4 characters').required(),
                  password: Yup.string().min(8, 'Password should contain at least 8 characters')
                  .matches(/\S/,'Password shouldn\'t contain whitespaces' )
                  .matches(/[A-Z]+/, 'Password should contain capital letters')
                  .matches(/[0-9]+/, 'Password should contain digits')
                  .matches(/[!_&^*()#@]+/, 'Password should contain special characters')
                  .required()
                })}*/
                onSubmit={async ({ username, password }) => {
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
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Enter</h1>
                  
                    <UserNameWithRef ref={usernameRef} />
                  
                    <TextInput 
                      label="Your password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      type="text"
                      isInvalid={authFailed}
                      error={"Incorrect login or password"}
                      required
                    />
                  
                  <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Enter</button>
                </Form>
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Don't have an account?</span>
                <Link to="/signup">Registration</Link>
              </div>
            </div>
          </div>
        </div>        
      </div>
    </div>
  )
};