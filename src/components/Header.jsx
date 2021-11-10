import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <nav className="shadow-sm navbar navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/login">React Chat</Link>
      </div>
    </nav>
  );
}