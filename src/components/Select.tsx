import React, {useState} from 'react';
import "./Select.css"
import {MdExpandMore} from 'react-icons/md';


const Select = ({options}) => {

    let [isExpanded, setIsExpanded] = useState(false);
    let [selectedOption, setSelectedOption] = useState(options[0]);
    let selectClick = () => {
        setIsExpanded(!isExpanded);
    }

    let selectOption = (option) => {
        setSelectedOption(option)
        setIsExpanded(false);
    }

    return (
        <div className={`select child ${isExpanded ? "expanded" : ""}`}>
            <div className="value" onClick={selectClick}>
                {selectedOption.label}
                <MdExpandMore />
            </div>
            <div className="options">
                {
                    options.map((option, index) => {
                        return (
                            <div className="option" key={index} onClick={() => selectOption(option)}>{option.label}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Select;