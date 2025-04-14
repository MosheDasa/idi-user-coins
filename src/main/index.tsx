import { app } from 'electron';
import { createNotificationWindow } from './windows/createNotificationWindow';
import { createDeskWindow } from './windows/createDeskWindow';

const mode = process.env.MODE || process.argv[2] || 'notification';
console.log("aaaaaaa");

if (mode === 'notification') {
  app.whenReady().then(createDeskWindow);
} else if (mode === 'desk') {
  app.whenReady().then(createDeskWindow);
}