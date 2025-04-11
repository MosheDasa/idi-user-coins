import React, { useEffect, useState } from 'react';
import Notification from './components/notification';
import { inputData as InputDataType } from './type/data';

const App: React.FC = () => {
  const [inputData, setInputData] = useState<InputDataType | null>(null);

  useEffect(() => {
    // if (!window.electronAPI) return;
    //     window.electronAPI?.onData(({ isPopup, userId, policyNr }) => {
    //     setInputData({ isPopup, userId, policyNr });
    // });
  }, []);

  return (
    <>
     <Notification   />
      {/* {inputData && inputData.isPopup ? (
        <Notification   />
      ) : (
        <DiscApp inputData={inputData} />
      )} */}
    </>
  );
};

export default App;
