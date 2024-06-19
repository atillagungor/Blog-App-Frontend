import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin, Typography } from 'antd';
import './Home.css';
import { BASE_API_URL } from '../../environment/environment';

const { Title, Paragraph } = Typography;

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

  if (loading) {
    return (
      <div className="loading-container">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <Typography.Text type="danger">{error}</Typography.Text>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="no-posts-container">
        <Typography.Text>No posts available</Typography.Text>
      </div>
    );
  }

  return (
    <div className="home">
      <Title level={2}>Posts</Title>
      <div className="posts">
        {posts.map(post => (
          <Card key={post.id} title={post.title} className="post">
            <Paragraph>{post.content}</Paragraph>
            <Paragraph strong>Created At:</Paragraph>
            <Paragraph>{new Date(post.createdDate).toLocaleDateString()}</Paragraph>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;