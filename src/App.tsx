import React from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router';


function App() {
  return (
    <div className='page d-flex flex-column'>
      <NavigationBar hasCancelBtn={true} hasEditBtn={true} hasPreview={true} hasSubmitBtn={true} />
      <div style={{height: "92%"}}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

