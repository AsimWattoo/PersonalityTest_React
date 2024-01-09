import React, {useState, useEffect} from 'react';
import "./Select.css"
import {MdExpandMore} from 'react-icons/md';
import { FaUserFriends } from 'react-icons/fa';


const Select = ({options, value, onChange=(opt) => {}, maxHeight= 500}) => {

    let [isExpanded, setIsExpanded] = useState(false);
    let [selectedOption, setSelectedOption] = useState({label: 'Select an Option', value: ""});

    useEffect(() => {
        if(options.length > 0) 
            setSelectedOption(options[0]);
    }, [options])

    let selectClick = () => {
        setIsExpanded(!isExpanded);
    }

    let selectOption = (option) => {
        setSelectedOption(option)
        setIsExpanded(false);
        if(onChange) {
            onChange(option);
        }
    }
    useEffect(() => {
        let filteredOption = options.filter(option => option.value == value);
        if(filteredOption && filteredOption.length > 0) {
            setSelectedOption(filteredOption[0])
        }
    }, [options, value]);

    return (
        <div className={`select child ${isExpanded ? "expanded" : ""}`}>
            <div className="value" onClick={selectClick}>
                <div>{selectedOption.label}</div>
                <MdExpandMore />
            </div>
            <div className="options" style={isExpanded ? {maxHeight: maxHeight} : {}}>
                {
                    options.map((option, index) => {
                        return (
                            <div className={`option ${option.value == selectedOption.value ? 'active' : ""}`} key={index} onClick={() => selectOption(option)}>{option.label}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Select;