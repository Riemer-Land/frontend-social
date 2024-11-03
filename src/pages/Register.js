import React, { useState } from 'react';
import api from '../services/api';

const Register = ({ history }) => {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    wachtwoord: '',
  });

  const { naam, email, wachtwoord } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', formData);
      if (res && res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        history.push('/');
      } else {
        console.error("Ongeldige response structuur:", res);
      }
    } catch (err) {
      console.error(err.response?.data || "Er is een fout opgetreden tijdens het registreren.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Registreren</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Naam</label>
          <input type="text" className="form-control" name="naam" value={naam} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>E-mailadres</label>
          <input type="email" className="form-control" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <label>Wachtwoord</label>
          <input type="password" className="form-control" name="wachtwoord" value={wachtwoord} onChange={onChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Registreren</button>
      </form>
    </div>
  );
};

export default Register;
