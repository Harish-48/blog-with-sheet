import React from 'react';
import { BlogPost as BlogPostType } from '../types';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <article className="blog-post">
      <div className="post-image">
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} />}
      </div>
      <div className="post-content">
        <h2>{post.title}</h2>
        <div className="post-meta">
          <span className="category">{post.category}</span>
          <span className="date">{post.date}</span>
        </div>
        <p className="description">{post.description}</p>
        {post.linkedin && (
          <div className="social-links">
            <a href={post.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogPost;