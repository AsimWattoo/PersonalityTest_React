import React from "react";

function Loader () {
    return (
        <div className="loader-container">
            <div className="loading-wave">
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
                <div className="loading-bar"></div>
            </div>
            <div className="text">Hold Tight! We are <strong>Loading</strong> your data</div>
        </div>
    )
}

export default Loader;