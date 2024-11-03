import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import Header from '../components/Header';

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await api.get('/posts/feed');
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchFeed();
  }, []);

  return (
    <>
      <Header />
      <div className="container mt-5">
        <h1>Feed</h1>
        <PostForm />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Feed ;
