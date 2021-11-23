import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx'

export default () => {
  const { loggedIn, logOut } = useAuth();

  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/login">React Chat</Link>
        { loggedIn && <Button className onClick={logOut} variant="primary">Logout</Button> }
      </Container>
    </Navbar>
  );
}