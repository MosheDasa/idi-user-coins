import React, { useEffect, useState } from 'react';
import { inputData } from '../type/data';
const log = require('electron-log');
 
const Notification: React.FC = () => {
 const [name, setName] = useState('שירה');
   const [amount, setAmount] = useState('0');
 
   useEffect(() => {
     window.electronAPI?.onData(({ isPopup , userId }) => {
      
     });
   }, []);
 
   return (
     <div className="popup">
       <div className="close-btn" onClick={() => window.close()}>×</div>
       <img className="icon" src="img/chest-icon-transparent.png" alt="תיבה" />
       <div className="title">וואו {name}!!</div>
       <div className="subtitle">הצלחת לצבור</div>
       <div className="amount">
         <span className="amount-text">₪{amount}</span>
         <img src="img/coins-icon-transparent.png" alt="מטבעות" />
       </div>
       <div className="footer">כל הכבוד לך!</div>
       <div>V-1.0.2</div>
     </div>
   );
};

export default Notification;