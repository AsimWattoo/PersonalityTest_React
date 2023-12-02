import React from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';

function NavigationBar({hasSubmitBtn, hasPreview, hasEditBtn}) {

  let navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between" style={{width: "100%"}}>
      <div className="container-fluid px-10"> {/* Use "px-0" to remove horizontal padding */}
        <h1 className="navbar-brand me-auto cursor-pointer" onClick={() => navigate("/")}>
          <span style={{ color: '#FFD700' }}>Personality</span> Test
        </h1>
        {
          <div className="d-flex align-items-center">
            {
              hasEditBtn ? 
              <Link to={"/quiz"} className="btn btn-primary mx-2 d-flex align-items-center" type="submit">
                <div className="me-2"><MdEdit /></div>
                Edit
              </Link> :
              <></>
            }
            {
              hasPreview ? 
              <Link to={"/preview"} className="btn btn-primary mx-2 d-flex align-items-center" type="submit">
                <div className="me-2"><MdVisibility /></div>
                Preview
              </Link> :
              <></>
            }
            {
              hasSubmitBtn ? 
              <button className="btn btn-primary mx-2" type="submit">
                Submit
              </button> :
              <></>
            }
          </div>
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
