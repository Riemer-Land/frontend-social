// src/components/Header.js
import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const navigate = useNavigate();

  // Haal het gebruikers-ID op uit het token
  const token = localStorage.getItem('token');
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // Zorg dat 'id' overeenkomt met de eigenschap in je token
    } catch (error) {
      console.error("Fout bij het decoderen van token:", error);
    }
  }

  const goToProfile = () => {
    if (userId) {
      navigate(`/profile/${userId}`);
    } else {
      console.error("Geen gebruikers-ID gevonden.");
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href="/" className="font-weight-bold">MyApp</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Form className="mx-auto" inline>
          <FormControl type="text" placeholder="Zoeken" className="mr-sm-2" />
        </Form>
        <Nav className="ml-auto">
          <Button variant="outline-primary" onClick={goToProfile} className="mr-2">
            Mijn Profiel
          </Button>
          <Button variant="outline-secondary" className="mr-2">
            🔔 Notificaties
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
