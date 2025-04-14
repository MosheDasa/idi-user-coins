// src/types/electron-api.d.ts

import {inputData} from './data';
export {};

declare global {
  interface Window {
    electronAPI?: {
      onData: (
        cb: (data: inputData) => void
      ) => void;
      showNotification: (data: { userId: string; policyNr: number }) => Promise<boolean>;
    };
  }
}
