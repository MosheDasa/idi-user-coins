import { app, ipcMain, protocol } from 'electron';
import { createNotificationWindow } from './windows/createNotificationWindow';
import { createDeskWindow } from './windows/createDeskWindow';
import log from 'electron-log';
import { URL } from 'url';

// הגדרת לוגים
log.transports.file.level = 'info';
log.transports.console.level = 'debug';

let deskWindow: Electron.BrowserWindow | null = null;

// פונקציה לפרסור פרמטרי URL
function parseUrlParams(url: string): { name: string; amount: number } | null {
  try {
    const parsedUrl = new URL(url);
    const name = parsedUrl.searchParams.get('name') || '';
    const amount = parseInt(parsedUrl.searchParams.get('amount') || '0', 10);
    return { name, amount };
  } catch (error) {
    log.error('שגיאה בפרסור URL:', error);
    return null;
  }
}

async function initializeApp() {
  try {
    // מחכה לאפליקציה להיות מוכנה
    await app.whenReady();

    // רישום הפרוטוקול המותאם אישית
    protocol.registerHttpProtocol('popupapp', (request, callback) => {
      const params = parseUrlParams(request.url);
      if (params) {
        showNotification(params.name, params.amount);
      }
    });

    // יוצר את חלון ה-DESK במרכז המסך
    deskWindow = await createDeskWindow();

    // מאזין לבקשות להפעלת התראה
    ipcMain.handle('show-notification', async (_, data: { userId: string; policyNr: number }) => {
      return await showNotification(data.userId, data.policyNr);
    });

    // מטפל בסגירת כל החלונות
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        app.quit();
      }
    });

    // מטפל בהפעלה מחדש ב-macOS
    app.on('activate', async () => {
      if (!deskWindow) {
        deskWindow = await createDeskWindow();
      }
    });

  } catch (error) {
    log.error('שגיאה באתחול האפליקציה:', error);
    app.quit();
  }
}

// פונקציה להצגת התראה
async function showNotification(name: string, amount: number): Promise<boolean> {
  try {
    const notificationWindow = await createNotificationWindow();
    notificationWindow.webContents.send('popup-data', {
      isPopup: true,
      userId: name,
      policyNr: amount
    });
    return true;
  } catch (error) {
    log.error('שגיאה בהצגת התראה:', error);
    return false;
  }
}

// מפעיל את האפליקציה
initializeApp().catch(error => {
  log.error('שגיאה קריטית:', error);
  app.quit();
});