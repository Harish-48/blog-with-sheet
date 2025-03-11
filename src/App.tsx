import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BlogPost from './components/BlogPost';
import { fetchBlogPosts } from './services/sheetService';
import { BlogPost as BlogPostType } from './types';

import './styles.css';

const App: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const loadBlogPosts = async () => {
      try {
        setLoading(true);
        const posts = await fetchBlogPosts();
        setBlogPosts(posts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        setLoading(false);
      }
    };

    loadBlogPosts();
  }, []);




  return (
    <div className="app">
      <Header />
      
      <main className="main-content">
        <div className="container">

          {/* Replace the <h1> tag with <BlurText> */}
          <h1>Latest Blog Posts</h1>

          
          {loading && <p className="loading">Loading blog posts...</p>}
          
          {error && <p className="error">{error}</p>}
          
          {!loading && !error && blogPosts.length === 0 && (
            <p>No blog posts found.</p>
          )}
          
          <div className="blog-posts-container">
            {blogPosts.map((post) => (
              <BlogPost key={post.slNo} post={post} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;