import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    wachtwoord: '',
  });
  const navigate = useNavigate(); // Gebruik useNavigate in plaats van history

  const { email, wachtwoord } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      if (res && res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      } else {
        console.error("Ongeldige response structuur:", res);
      }
    } catch (err) {
      console.error("Error:", err.message);
      console.error("Server response:", err.response?.data || "Geen response van de server");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Inloggen</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>E-mailadres</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Wachtwoord</label>
          <input
            type="password"
            className="form-control"
            name="wachtwoord"
            value={wachtwoord}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Inloggen</button>
      </form>
    </div>
  );
};

export default Login;
