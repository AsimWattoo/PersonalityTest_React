import React from 'react';

function NavigationBar({hasSubmitBtn}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between" style={{width: "100%"}}>
      <div className="container-fluid px-10"> {/* Use "px-0" to remove horizontal padding */}
        <h1 className="navbar-brand me-auto">
          <span style={{ color: '#FFD700' }}>Personality</span> Test
        </h1>
        {
          hasSubmitBtn ? 
          <form className="d-flex">
            <button className="btn btn-primary ms-auto" type="submit">
              Submit
            </button>
          </form>
          :
          <></>
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
