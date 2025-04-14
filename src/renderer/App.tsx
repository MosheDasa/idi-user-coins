import React from 'react';
import { inputData } from '../type/data';
import Notification from './components/notification';
import DiscApp from './components/disc-app';

const App: React.FC = () => {
  return (
    <>
      <DiscApp />
      <Notification />
    </>
  );
};

export default App;