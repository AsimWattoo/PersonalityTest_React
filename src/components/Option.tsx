import React, {useState, useEffect} from 'react';
import type {OptionSelection} from "../redux/question";
import { useAppDispatch } from '../redux/hooks';
import { selectOption } from '../redux/question';

function Option({option, properties, questionId, optionId}) {
    let [style, setStyle] = useState(properties.options)
    let dispatch = useAppDispatch();
    useEffect(() => {
        if(option.selected)
        {
            setStyle(properties.SelectedOptionStyle);
        }
        else {
            setStyle(properties.options)
        }
    }, [option])

    let onMouseEnter = () => {
      if(!option.selected){
        setStyle(properties.OptionHoverStyle)
      }
    }

    let onMouseLeave = () => {
      if(!option.selected) {
        setStyle(properties.options)
      }
    }

    let optionClicked = () => {
        let optionSelection: OptionSelection = {
            optionId: optionId,
            questionId: questionId
        };
        dispatch(selectOption(optionSelection))
    }

    return (
      <div className="option-container">
        <p style={{...style, "transition": "all 0.2s ease-in-out"}} onClick={optionClicked} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          {option.text}
        </p>
      </div>
    )
  }

  export default Option;