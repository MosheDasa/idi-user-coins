import React, { useEffect, useState } from 'react';
import { inputData } from '../../type/data';
import { UserData } from '../../services/api';
import './notification.css';

interface NotificationProps {
  onClose?: () => void;
}

const Notification: React.FC<NotificationProps> = ({ onClose }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleData = (data: inputData) => {
      if (data.isPopup) {
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

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  

  return (
    <div className={`notification ${!isVisible ? 'visible' : ''}`}>
      <div className="notification-content">
        <button className="close-btn" onClick={handleClose} aria-label="סגור">
          ×
        </button>
        <img 
          className="icon" 
          src="img/chest-icon-transparent.png" 
          alt="תיבת אוצר" 
          loading="lazy"
        />
        <div className="title">וואו שירה!</div>
        <div className="subtitle">הצלחת לצבור</div>
        <div className="amount">
          <span className="amount-text">₪1,000</span>
          <img 
            src="img/coins-icon-transparent.png" 
            alt="מטבעות" 
            loading="lazy"
          />
        </div>
        <div className="footer">כל הכבוד לך!</div>
      </div>
    </div>
  );
};

export default Notification;