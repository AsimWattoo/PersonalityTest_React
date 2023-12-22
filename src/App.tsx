import React from 'react';
import NavigationBar from './NavigationBar';
import { Outlet } from 'react-router';
import NotificationModal from './components/Modals/NotificationModal';
import { useAppSelector } from './redux/hooks';


function App() {
  let notification = useAppSelector(state => state.Notification);

  return (
    <div className='page d-flex flex-column'>
      {
        notification.message ? 
        <NotificationModal isError={notification.isError} message={notification.message}/> : <></>
      }
      <NavigationBar hasCancelBtn={true} hasEditBtn={true} hasPreview={true} hasSubmitBtn={true} />
      <div style={{height: "92%"}}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;

