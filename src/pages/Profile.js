import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Post from '../components/Post';
import { jwtDecode } from 'jwt-decode';

const Profile = ({ match }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);

  const userId = match.params.id;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const resUser = await api.get(`/users/${userId}`);
        setUser(resUser.data);
        const resPosts = await api.get(`/posts/user/${userId}`);
        setPosts(resPosts.data);

        // Controleer of de huidige gebruiker deze gebruiker volgt
        const currentUserId = jwtDecode(localStorage.getItem('token')).id;
        setIsFollowing(resUser.data.volgers.some((follower) => follower._id === currentUserId));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, [userId]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await api.post(`/users/unfollow/${userId}`);
      } else {
        await api.post(`/users/follow/${userId}`);
      }
      setIsFollowing(!isFollowing);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div>Laden...</div>;

  return (
    <div className="container mt-5">
      <h1>{user.naam}</h1>
      <button className="btn btn-primary" onClick={handleFollow}>
        {isFollowing ? 'Ontvolgen' : 'Volgen'}
      </button>
      <h2 className="mt-4">Posts</h2>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Profile;
