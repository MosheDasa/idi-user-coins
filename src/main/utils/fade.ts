import { BrowserWindow } from 'electron';

export function fadeIn(win: BrowserWindow, targetOpacity = 0.98, step = 0.05, interval = 30) {
  let opacity = 0;
  const fade = setInterval(() => {
    opacity += step;
    if (opacity >= targetOpacity) {
      win.setOpacity(targetOpacity);
      clearInterval(fade);
    } else {
      win.setOpacity(opacity);
    }
  }, interval);
}

export function fadeOutAndClose(win: BrowserWindow, delay = 5000, step = 0.05, interval = 30) {
  setTimeout(() => {
    let opacity = win.getOpacity();
    const fade = setInterval(() => {
      opacity -= step;
      if (opacity <= 0) {
        clearInterval(fade);
        win.close();
      } else {
        win.setOpacity(opacity);
      }
    }, interval);
  }, delay);
}