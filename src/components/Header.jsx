import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx'
import { useTranslation } from 'react-i18next';

export default () => {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation();
  return (
    <Navbar className="shadow-sm" variant="light" bg="white" expand="lg">
      <Container>
        <Link className="navbar-brand" to="/">{t('header.chat')}</Link>
        { loggedIn && <Button className onClick={logOut} variant="primary">{t('header.logout')}</Button> }
      </Container>
    </Navbar>
  );
};