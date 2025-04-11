import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  onData: (callback: (data: { isPopup: boolean; userId: string; policyNr?: string }) => void) => {
    ipcRenderer.on('popup-data', (_event, data) => {
      callback(data);
    });
  }
});

export {};