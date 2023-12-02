import React, {useState, useEffect} from 'react';

function ToggleBtn({value, onChange}) {
    let [isOn, setIsOn] = useState(value)

    let toggle = () => {
        if(onChange) {
            onChange(!isOn);
        }
        setIsOn(!isOn);
    }

    useEffect(() => {
        setIsOn(value)
    }, [value])

    let getTransform = () => {
        return isOn ? 54.5 : 5.5;
    }

    return (
        <div className={`toggle-btn ${isOn ? 'active' : ''}`} onClick={toggle}>
            <div className='background'>
            </div>
            <div className='toggle' style={{left: `${getTransform()}%`}}>
            </div>
        </div>
    )
}

export default ToggleBtn;