import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import tokenManager from '../utils/tokenManager';

const SessionWarning = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = tokenManager.getToken();
      
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        const timeUntilExpiry = decoded.exp - currentTime;
        
        // Show warning when less than 5 minutes remain
        if (timeUntilExpiry < 300 && timeUntilExpiry > 0) {
          setShowWarning(true);
          setTimeRemaining(Math.floor(timeUntilExpiry));
        } else {
          setShowWarning(false);
        }
      } catch (error) {
        console.error('Error checking token expiry:', error);
      }
    };

    // Check every 30 seconds
    const interval = setInterval(checkTokenExpiry, 30000);
    
    // Initial check
    checkTokenExpiry();

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showWarning && timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showWarning, timeRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRefreshSession = () => {
    // Use token manager's warning system
    tokenManager.showWarning(300);
    setShowWarning(false);
  };

  if (!showWarning) return null;

  return (
    <div className="fixed top-20 right-4 z-50 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg shadow-lg max-w-sm">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-yellow-800">
            Session Expiring Soon
          </p>
          <p className="mt-1 text-sm text-yellow-700">
            Your session will expire in {formatTime(timeRemaining)}. Please save your work and refresh your session.
          </p>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={handleRefreshSession}
              className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded text-sm font-medium hover:bg-yellow-200 transition-colors"
            >
              Refresh Session
            </button>
            <button
              onClick={() => setShowWarning(false)}
              className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionWarning;
