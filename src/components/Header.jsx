import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/login">React Chat</Link>
      </Container>
    </Navbar>
  );
}