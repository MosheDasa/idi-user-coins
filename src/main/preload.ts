import { contextBridge, ipcRenderer } from 'electron';
import { inputData } from '../type/data';

// יצירת ה-API המוגן
contextBridge.exposeInMainWorld('electronAPI', {
  onData: (callback: (data: inputData) => void) => {
    // הסרת כל המאזינים הקודמים
    ipcRenderer.removeAllListeners('popup-data');
    
    // הוספת מאזין חדש
    ipcRenderer.on('popup-data', (_event, data: inputData) => {
      try {
        // וידוא שהנתונים תקינים
        if (typeof data.isPopup === 'boolean' && 
            typeof data.userId === 'string' && 
            (data.policyNr === undefined || typeof data.policyNr === 'number')) {
          callback(data);
        } else {
          console.error('נתונים לא תקינים התקבלו:', data);
        }
      } catch (error) {
        console.error('שגיאה בטיפול בנתונים:', error);
      }
    });
  }
});