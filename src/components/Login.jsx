import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/loginIcon.jpeg';
import RegistrationForm from './RegistrationForm.jsx';

export default () => {
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xx-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img className="rouded-circle" alt="Enter" src={logo}/>  
              </div>
              <RegistrationForm />
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
  );
};