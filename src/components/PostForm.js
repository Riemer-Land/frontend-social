import React, { useState } from 'react';
import api from '../services/api';

const PostForm = () => {
  const [beschrijving, setBeschrijving] = useState('');
  const [media, setMedia] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('beschrijving', beschrijving);
    if (media) {
      formData.append('media', media);
    }
    try {
      await api.post('/posts', formData);
      // Eventueel de feed opnieuw ophalen
      setBeschrijving('');
      setMedia(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Wat wil je delen?"
          value={beschrijving}
          onChange={(e) => setBeschrijving(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <input type="file" className="form-control-file" onChange={(e) => setMedia(e.target.files[0])} />
      </div>
      <button type="submit" className="btn btn-success">Posten</button>
    </form>
  );
};

export default PostForm;
