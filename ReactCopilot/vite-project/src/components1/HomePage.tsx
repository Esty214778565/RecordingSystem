import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <header className="header">
        <h1>Welcome to the Management Records System</h1>
        <nav>
          <ul>
            <li><Link to="/courses">View Courses</Link></li>
            <li><Link to="/lessons">View Lessons</Link></li>
            <li><Link to="/personal-area">Personal Area</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </header>
      <main className="main-content">
        <h2>Empowering Education Management</h2>
        <p>Manage your educational records efficiently and effectively.</p>
      </main>
      <footer className="footer">
        <p>&copy; 2025 Management Records System</p>
      </footer>
    </div>
  );
}

export default HomePage;