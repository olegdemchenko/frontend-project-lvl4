import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './Header.jsx';
import Login from './Login.jsx';
import Chat from './Chat';
import NotFound from './NotFound.jsx';
import AuthContext from '../contexts/AuthContext';

export default () => {
  const authData = JSON.parse(localStorage.getItem('authData'));
  return (
    <BrowserRouter>
      <Header />
      <AuthContext.Provider value={authData}>
        <Routes>
          <Route path="/" element={<Chat />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};