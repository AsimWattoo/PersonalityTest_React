import React from "react";

type LoaderProps = {
    showMessage: boolean,
    isSmall: boolean
}

function Loader ({showMessage = true, isSmall = false} : LoaderProps) {
    return (
        <div className="loader-container" style={{padding: isSmall ? 0 : '5em'}}>
            <div className="loading-wave" style={{height: isSmall ? '50px' : '100px' }}>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
            {
                showMessage ?
                <div className="text">Hold Tight! We are <strong>Loading</strong> your data</div> : <></>
            }
        </div>
    )
}

export default Loader;