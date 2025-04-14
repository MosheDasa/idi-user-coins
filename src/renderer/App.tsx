import React, { useEffect, useState } from 'react';
import { inputData } from '../type/data';
import  Notification  from '../renderer/components/notification';
import  DiscApp  from '../renderer/components/disc-app';
declare global {
  interface Window {
    electronAPI?: {
      onData: (cb: (data: inputData) => void) => void;
    };
  }
}

const App: React.FC = () => {
 

  return (
    <>
    <DiscApp />
    <Notification />
  
    </>
  );
};

export default App;