import React from 'react';
import './Post.css';
import { AiFillHeart } from 'react-icons/ai';

interface PostProps {
    id: string;
    title: string;
    content: string;
    createdDate: string;
    isLiked: boolean;
    onLike: (id: string) => void;
}

const Post: React.FC<PostProps> = ({ id, title, content, createdDate, isLiked, onLike }) => {
    return (
        <div className="post">
            <div className="post-header">
                <h3 className="post-title">{title}</h3>
                <p className="post-created-at">{new Date(createdDate).toLocaleDateString()}</p>
            </div>
            <div className="post-content">{content}</div>
            <div className="post-footer">
                <button className={`like-button ${isLiked ? 'liked' : ''}`} onClick={() => onLike(id)}>
                    <AiFillHeart />
                </button>
            </div>
        </div>
    );
};

export default Post;