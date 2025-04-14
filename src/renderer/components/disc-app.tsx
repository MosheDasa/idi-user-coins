import React, { useEffect, useState } from 'react';
import { inputData } from '../../type/data';
import { UserData } from '../../services/api';
import './disc-app.css';

const DiscApp: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleData = (data: inputData) => {
      if (!data.isPopup) {
        setUserData({
          name: data.userId,
          lng: data.policyNr?.toString() || '0'
        });
        setIsVisible(true);
      }
    };

    window.electronAPI?.onData(handleData);

    return () => {
      // Cleanup if needed
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="disc-app">
      <div className="disc-app-content">
        <img 
          className="icon" 
          src="img/coins-icon-transparent.png" 
          alt="מטבעות" 
          loading="lazy"
        />
        <div className="user-info">
          <h2 className="title">שלום {userData?.name || 'חבר'}!</h2>
          <div className="balance">
            <span className="label">יתרה:</span>
            <span className="amount">₪{userData?.lng || '0'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscApp;