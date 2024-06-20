import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import { BASE_API_URL } from '../../environment/environment';
import Post from '../../components/Post/Post';
import Navbar from '../../components/Navbar/Navbar';

interface PostData {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}Post/getall?PageIndex=0&PageSize=5`);
        console.log('API response:', response.data);
        if (response.data && response.data.items && response.data.items.length > 0) {
          setPosts(response.data.items.reverse()); // Yeni eklenen postlar en üstte gözüksün
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
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
    }
  };

  const filterPosts = (query: string) => {
    setSearchTerm(query);
    // Burada isterseniz backend'e tekrar istek atarak filtreleme işlemini yapabilirsiniz.
    // Örneğin, axios ile backend'e yeni bir istek atabilir ve filtrelenmiş sonuçları alabilirsiniz.
    // Backend'den gelen sonuçları setPosts ile güncelleyebilirsiniz.
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <Navbar filterPosts={filterPosts} />
      <h2 className="posts-title">Posts</h2>
      <div className="posts">
        {filteredPosts.map(post => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdDate={post.createdDate}
            isLiked={likedPosts.includes(post.id)}
            onLike={handleLike}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;