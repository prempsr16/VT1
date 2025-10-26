import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Notification, User } from '../../types';
import api from '../../services/api';

const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;


const Header: React.FC<{ user: User }> = ({ user }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  // Polling for notifications every 10 seconds
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const endpoint = user.role === 'teacher' ? '/getteachersnot.php' : '/notification.php';
        const response = await api.get(endpoint);
        if (response.data && Array.isArray(response.data)) {
          setNotifications(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 10000);
    return () => clearInterval(intervalId);
  }, [user]);


  return (
    <header className="h-16 bg-secondary flex-shrink-0 flex items-center justify-between px-6 border-b border-gray-700">
      <div>
        <h2 className="text-lg font-semibold text-text-primary capitalize hidden sm:block">{user?.role} Dashboard</h2>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-text-secondary hover:text-text-primary">
            <BellIcon />
            {notifications.length > 0 && <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span></span>}
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-surface rounded-md shadow-lg z-20 border border-gray-700 animate-fade-in-up">
              <div className="p-4 font-bold border-b border-gray-700">Notifications</div>
              <ul className="py-1 max-h-96 overflow-y-auto">
                {notifications.length > 0 ? notifications.map(n => (
                  <li key={n.id} className="px-4 py-3 text-sm text-text-secondary border-b border-gray-700 last:border-b-0 hover:bg-gray-700/50">{n.message}</li>
                )) : <li className="px-4 py-3 text-sm text-center text-text-secondary">No new notifications</li>}
              </ul>
            </div>
          )}
        </div>
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3 border-2 border-primary-dark">
            <UserIcon />
          </div>
          <span className="text-text-primary mr-3 hidden sm:inline">{user?.name}</span>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-light rounded-md hover:bg-primary-hover transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
