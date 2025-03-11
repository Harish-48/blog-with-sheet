import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <h1>My Blog</h1>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;