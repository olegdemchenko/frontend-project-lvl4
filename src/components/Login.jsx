import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../assets/img/loginIcon.jpeg';
import TextInput from './TextInput';

export default () =>  {
  const nicknameRef = React.createRef();
  
  useEffect(() => {
    nicknameRef.current.focus();
  }, []);
  
  const NickNameWithRef = React.forwardRef((props, ref) => {
    return (
      <TextInput 
        className="form-control"
        label="Your nickname"
        name="nickname"
        id="nickname"
        placeholder="Your nickname"
        type="text"
        forwardedRef={ref}
        required
      />
    );
  });

  const navigate = useNavigate();
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
                  nickname: '',
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
                onSubmit={async ({ nickname, password }) => {
                  try {
                    const { data: { token } } = await axios.post('/api/v1/login', { username: nickname, password });                   
                    localStorage.setItem('authData', JSON.stringify({ username: nickname, password, token }));
                    navigate('/');
                  } catch (e) {
                    console.log(e.message);
                  }
                }}
              >
                <Form className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">Enter</h1>
                  
                    <NickNameWithRef ref={nicknameRef} />
                  
                    <TextInput 
                      className="form-control"
                      label="Your password"
                      name="password"
                      id="password"
                      placeholder="Your password"
                      type="text"
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