import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Modal, Button } from 'react-bootstrap';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem('token');
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        isAuthenticated = true;
      } else {
        localStorage.removeItem('token');
      }
    } catch (err) {
      localStorage.removeItem('token');
    }
  }

  // Als de gebruiker niet is ingelogd, toon de modal
  const handleCloseModal = () => setShowModal(false);
  const handleLogin = () => {
    setShowModal(false);
    navigate('/login');
  };
  const handleRegister = () => {
    setShowModal(false);
    navigate('/register');
  };

  if (!isAuthenticated) {
    setShowModal(true); // Toon de modal als de gebruiker niet is ingelogd
  }

  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <>
          <Modal show={showModal} onHide={handleCloseModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Inloggen vereist</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Je moet ingelogd zijn om de feedpagina te bekijken.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleLogin}>
                Inloggen
              </Button>
              <Button variant="primary" onClick={handleRegister}>
                Aanmelden
              </Button>
            </Modal.Footer>
          </Modal>
          <Navigate to="/login" replace />
        </>
      )}
    </>
  );
};

export default PrivateRoute;
