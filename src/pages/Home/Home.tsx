import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { BASE_API_URL } from '../../environment/environment';
import { AiFillHeart } from 'react-icons/ai'; // Kalp ikonu

interface Post {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]); // Beğenilen postların listesi

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}Post/getall?PageIndex=0&PageSize=5`);
        console.log('API response:', response.data);
        if (response.data && response.data.items && response.data.items.length > 0) {
          setPosts(response.data.items);
        } else {
          setError('No posts available');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setError('Error fetching posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      // Eğer zaten beğenilmişse, beğeniden kaldır
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      // Eğer beğenilmemişse, beğen
      setLikedPosts([...likedPosts, postId]);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts-container">
        No posts available
      </div>
    );
  }

  return (
    <div className="home">
      <h2 className="posts-title">Posts</h2>
      <div className="posts">
        {posts.map(post => (
          <div key={post.id} className="post">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-content">{post.content}</p>
            <p className="post-created-at">Created At: {new Date(post.createdDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
