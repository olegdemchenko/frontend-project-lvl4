import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../store/store.js';
import { reset } from '../store/chatSlice';
import Socket from './Socket.jsx';
import Header from './Header.jsx';
import Login from './Login.jsx';
import Signup from './Registration.jsx';
import Chat from './Chat.jsx';
import NotFound from './NotFound.jsx';
import authContext from '../contexts/AuthContext';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const isAuthorized = !!localStorage.getItem('userId');
  const [loggedIn, setLoggedIn] = useState(isAuthorized);

  const logIn = () => {
    store.dispatch(reset());
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userId');
    store.dispatch(reset());
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const { loggedIn } = useAuth();
  if (!loggedIn || !localStorage.getItem('userId')) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

export default ({ socket }) => (
  <BrowserRouter>
    <AuthProvider>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              (
                <RequireAuth>
                  <Provider store={store}>
                    <Socket socket={socket}>
                      <Chat />
                    </Socket>
                  </Provider>
                </RequireAuth>
              )
        } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  </BrowserRouter>
);
