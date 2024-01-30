import "./component.css";
import { useState } from "react";

function DataTooltip(props) {
    let [isTooltipShown, setIsTooltipShown] = useState(false);

    let onMouseEnter = () => {
        setIsTooltipShown(true);
    }

    let onMouseLeave = () => {
        setIsTooltipShown(false);
    }

    return (
        <div className="tooltip-container tooltip-data">
            <div className={`tooltip ${isTooltipShown ? 'show' : 'hide'} ${props.left ? 'left' : ''}`}>
                <div className="message">
                    {props.message}
                </div>
                <svg className="tooltip-point">
                    <path d="M0 0 L7 6 L15 0 Z"/>
                </svg>
            </div>
            <div className="icon" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                {props.children}
            </div>
        </div>
    )
}

export default DataTooltip;