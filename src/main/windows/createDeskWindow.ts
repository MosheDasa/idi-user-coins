import { BrowserWindow, screen } from 'electron';
import path from 'path';
import { fetchUserData } from '../../services/api';

export async function createDeskWindow() {
  const data = await fetchUserData();
  const display = screen.getPrimaryDisplay();
  const { width, height } = display.workAreaSize;

  const win = new BrowserWindow({
    width: 400,
    height: 300,
    x: Math.floor((width - 400) / 2),
    y: Math.floor((height - 300) / 2),
    frame: false,
    transparent: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: false,
    opacity: 1,
    show: true,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, '../../index.html'));

  win.once('ready-to-show', () => {
    win.webContents.send('popup-data', {
      isPopup: false,
      userId: data?.name || 'ברירת מחדל',
      policyNr: parseInt(data?.lng || '0')
    });
    win.show();
  });

  return win;
}