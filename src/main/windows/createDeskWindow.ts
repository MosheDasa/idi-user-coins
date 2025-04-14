import { BrowserWindow, screen } from 'electron';
import path from 'path';
import { fetchUserData } from '../../services/api';

export async function createDeskWindow() {
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
    opacity: 1,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, '..', 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, '../../index.html'));

  win.once('ready-to-show', () => {
    win.webContents.send('popup-data', {
      name: data?.name || 'ברירת מחדל',
      amount: data?.lng || '0'
    });
    win.show();
  });
}