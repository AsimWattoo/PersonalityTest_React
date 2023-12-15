import React from 'react';
import { MdEdit, MdSettings, MdVisibility } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';


function NavigationBar() {
  let navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="navigation-container">
        <h1 className="brand" onClick={() => navigate("/")}>
          <span>Personality</span> Test
        </h1>
        <div className="actions">
          <div className='primary-text-btn' onClick={() => navigate("/settings/fonts")}>
            <MdSettings />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
