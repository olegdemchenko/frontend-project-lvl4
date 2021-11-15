import React from 'react';
import { Navigate } from 'react-router-dom';

import AuthContext from '../contexts/AuthContext';

export default () => {
  return <AuthContext.Consumer>
    {(value) => {
      if (value && value.token) {
        return <div>Main chat page</div>
      }
      return <Navigate to="/login"/>
    }}
  </AuthContext.Consumer>
}