import { app } from 'electron';
import { createNotificationWindow } from './windows/createNotificationWindow';
import { createDeskWindow } from './windows/createDeskWindow';
import log from 'electron-log';

// הגדרת לוגים
log.transports.file.level = 'info';
log.transports.console.level = 'debug';

const MODE = process.env.MODE || process.argv[2] || 'notification';

async function initializeApp() {
  try {
    // מחכה לאפליקציה להיות מוכנה
    await app.whenReady();

    // יוצר את החלון המתאים לפי המצב
    if (MODE === 'notification') {
      await createNotificationWindow();
    } else if (MODE === 'desk') {
      await createDeskWindow();
    } else {
      log.warn(`מצב לא ידוע: ${MODE}, משתמש במצב ברירת מחדל (notification)`);
      await createNotificationWindow();
    }

    // מטפל בסגירת כל החלונות
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    // מטפל בהפעלה מחדש ב-macOS
    app.on('activate', async () => {
      if (MODE === 'notification') {
        await createNotificationWindow();
      } else if (MODE === 'desk') {
        await createDeskWindow();
      }
    });

  } catch (error) {
    log.error('שגיאה באתחול האפליקציה:', error);
    app.quit();
  }
}

// מפעיל את האפליקציה
initializeApp().catch(error => {
  log.error('שגיאה קריטית:', error);
  app.quit();
});