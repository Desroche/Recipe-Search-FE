import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../provider/authProvider';

const NavigationBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (

    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/home" className="text-white text-lg font-bold">Home</Link>
        <Link to="/profile" className="text-white text-lg font-bold">Profile</Link>
        <button onClick={handleLogout} className="text-white">Logout</button>
      </div>
    </nav>

  );
};

export default NavigationBar;
