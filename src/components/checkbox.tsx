import { useState } from "react";
import "./component.css";

let CheckBox = ({onChange}) => {

    let [checked, setChecked] = useState(false);

    let onClick = () => {
        if(onChange) {
            onChange(!checked);
        }
        setChecked(!checked);
    }

    return (
        <div className="checkbox-wrapper-19">
            <input type="checkbox" id="cbtest-19" checked={checked} onClick={onClick} />
            <label for="cbtest-19" className="check-box" />
        </div>
    )
}

export default CheckBox;