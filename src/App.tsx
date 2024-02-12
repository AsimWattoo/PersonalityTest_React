import React, { useEffect, useState } from 'react';
import NavigationBar from './NavigationBar';
import { Outlet, useLocation, useNavigate } from 'react-router';
import NotificationModal from './components/Modals/NotificationModal';
import { useAppSelector } from './redux/hooks';
import { getToken, storeToken } from './helpers/token';
import Loader from './components/Loader';
import { sendRequest } from './helpers/request';
import links from './links';

function App() {
  let notification = useAppSelector(state => state.Notification);
  let token = getToken();
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {

    console.log('Checking Quiz');

    if(location.pathname.includes("/quiz/play")) {
      return;
    }

    if(!token) {
      navigate("/login");
    } else {
      let validateToken = async () => {
        setIsLoading(true);
        let response = await sendRequest(links.validate_token.url(), links.validate_token.type, {}, 'application/json', true, true);
        console.log(response);
        if(response.error) {
          navigate("/login");
        } 
        else {
          storeToken(response.token);
        }
        setIsLoading(false);
      }
      validateToken();
      
    }
  }, [location]);

  return (
    <>
    {
      isLoading ? 
      <Loader isSmall={false} showMessage={true}/> :
      <div className='page main-page'>
        {
          notification.message ? 
          <NotificationModal isError={notification.isError} message={notification.message}/> : <></>
        }
        <NavigationBar hasCancelBtn={true} hasEditBtn={true} hasPreview={true} hasSubmitBtn={true} />
        <div style={{height: "100%"}}>
          <Outlet />
        </div>
      </div>
    }
    </>
  );
}

export default App;

