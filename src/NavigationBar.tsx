import React from 'react';
import { MdEdit, MdLogout, MdSettings, MdVisibility } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteToken } from './helpers/token';


function NavigationBar() {
  let navigate = useNavigate();
  let logout = () => {
    deleteToken();
    navigate("/login");
  }

  return (
    <div className="nav-bar">
      <div className="navigation-container">
        <h1 className="brand" onClick={() => navigate("/")}>
          <span>Personality</span> Test
        </h1>
        <div className="d-flex align-items-center justify-content-end">
          <div className='primary-text-btn' onClick={() => navigate("/settings/fonts")}>
            <MdSettings />
          </div>
          <div className='danger-text-btn' onClick={logout}>
            <MdLogout />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
