import React from 'react';
import api from '../services/api';

const Post = ({ post }) => {
  const handleLike = async () => {
    try {
      await api.post(`/posts/like/${post._id}`);
      // Eventueel de UI updaten
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-body">
        <h5 className="card-title">{post.auteur.naam}</h5>
        <p className="card-text">{post.beschrijving}</p>
        {post.mediaUrl && (
          <img
            src={`http://localhost:5000/uploads/${post.mediaUrl}`}
            alt="Post Media"
            className="img-fluid"
          />
        )}
        <button className="btn btn-primary mt-2" onClick={handleLike}>
          Like ({post.likes.length})
        </button>
      </div>
    </div>
  );
};

export default Post;
    