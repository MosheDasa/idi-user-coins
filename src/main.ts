import { app, BrowserWindow, screen } from 'electron';
import path from 'path';
import { fetchUserData } from './services/api';
import log from 'electron-log';


const mode = process.env.MODE || process.argv[2] || 'notification';

if (mode === 'notification') {
  app.whenReady().then(createNotificationWindow);
} else if (mode === 'desk') {
  app.whenReady().then(createNotificationWindow);
}

async function createNotificationWindow() {
  const data = await fetchUserData();
  log.info('API DATA:', data);

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
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', async () => {
    const name = data?.name || 'ברירת מחדל';
    const amount = data?.lng || '0';

    win.webContents.send('popup-data', { name, amount });
    win.show();

    let opacity = 0;
    const fadeIn = setInterval(() => {
      opacity += 0.05;
      if (opacity >= 0.98) {
        win.setOpacity(0.98);
        clearInterval(fadeIn);
      } else {
        win.setOpacity(opacity);
      }
    }, 30);

    setTimeout(() => {
      let opacity = 0.98;
      const fadeOut = setInterval(() => {
        opacity -= 0.05;
        if (opacity <= 0) {
          clearInterval(fadeOut);
          win.close();
        } else {
          win.setOpacity(opacity);
        }
      }, 30);
    }, 5000);
  });
}

async function createDeskWindow() {
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
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true
    }
  });

  win.loadFile(path.join(__dirname, 'index.html'));

  win.once('ready-to-show', () => {
    const name = data?.name || 'ברירת מחדל';
    const amount = data?.lng || '0';

    win.webContents.send('popup-data', { name, amount });
    win.show();
  });
}