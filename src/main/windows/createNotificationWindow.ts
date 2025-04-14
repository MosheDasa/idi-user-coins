import { BrowserWindow, screen } from 'electron';
import path from 'path';
import { fetchUserData } from '../../services/api';
import { fadeIn, fadeOutAndClose } from '../utils/fade';

export async function createNotificationWindow() {
  const data = await fetchUserData();
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  const win = new BrowserWindow({
    width: 300,
    height: 260,
    x: width - 320,
    y: height - 280,
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    opacity: 0,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, '../../index.html'));

  win.once('ready-to-show', () => {
    win.webContents.send('popup-data', {
      isPopup: true,
      userId: data?.name || 'ברירת מחדל',
      policyNr: parseInt(data?.lng || '0')
    });

    win.show();
    fadeIn(win);
    fadeOutAndClose(win, 10000); // 10 שניות
  });

  return win;
}