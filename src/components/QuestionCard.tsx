import React from 'react';
import { useState, ChangeEvent, useEffect } from 'react';
import type { HeadingUpdate, Option, OptionAdd, OptionUpdate } from '../redux/question';
import { removeQuestion, updateHeading, removeOption, addOption, updateOption } from '../redux/question';
import { useAppDispatch } from '../redux/hooks';
import {MdAdd, MdClose, MdDelete} from 'react-icons/md';

// QuestionCard component
function QuestionCard({properties, sharedProperties, questions, questionId, changePage}) {

  let [style, setStyle] = useState({});
  let dispatch = useAppDispatch()

  useEffect(() => {
    let newStyle = {"marginTop": sharedProperties.options["marginTop"], 
    "marginBottom": sharedProperties.options["marginBottom"]};
    setStyle(newStyle)
  }, [sharedProperties.options])

  let newOption = () => {
    let newOption: Option = {
      text: "",
      value: 0,
      selected: false,
    }

    let optionAdd : OptionAdd = {
      option: newOption,
      questionIndex: questionId
    }

    dispatch(addOption(optionAdd))
  }

  let updateOptionText = (index, value) => {

    let option = questions[questionId].options[index];

    let updatedOption : Option = {
      text: value,
      value: option.value,
      selected: false,
    }

    let optionUpdateProperties : OptionUpdate = {
      questionIndex: questionId,
      optionIndex: index,
      option: updatedOption
    }
    dispatch(updateOption(optionUpdateProperties))
  }

  let updateOptionValue = (index, value) => {
    let option = questions[questionId].options[index];

    let updatedOption : Option = {
      text: option.text,
      value: value
    }

    let optionUpdateProperties : OptionUpdate = {
      questionIndex: questionId,
      optionIndex: index,
      option: updatedOption
    }
    dispatch(updateOption(optionUpdateProperties))
  }

  let deleteOption = (index) => {
    let optionDelete : OptionUpdate = {
      optionIndex: index,
      questionIndex: questionId,
    }
    dispatch(removeOption(optionDelete))
  }

  let deleteQuestion = (id) => {
    //If this is the last question to be deleted
    if(id == questions.length - 1 && id != 0) {
      changePage(questionId - 1);
    }
    dispatch(removeQuestion(id))
  }

  let headingChanged = (value) => {
    let headingUpdate : HeadingUpdate = {
      index: questionId,
      heading: value
    }
    dispatch(updateHeading(headingUpdate))
  }

  return (
    <div className="question-container">
      <div className="question-header">
        <input type="text" style={sharedProperties.heading} placeholder="Enter Question" value={questions[questionId].heading} onChange={e => headingChanged(e.target.value)}/>
      </div>
      <div className="options-container d-flex flex-column align-items-center mt-3">
        {
          questions[questionId].options.map((option, index) => {
            return (
              <div className="option-container">
                <input type="text" value={option.text} style={{...sharedProperties.options}} onChange={e => updateOptionText(index, e.target.value)}/>
                <div className="controls" style={style}>
                  <div className="input-default">
                    <label>Value</label>
                    <input type="number" value={option.value} onChange={e => updateOptionValue(index, e.target.value)}/>
                  </div>
                  <div className="btn btn-danger ms-2" onClick={() => deleteOption(index)}>
                    <MdDelete />
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className='d-flex align-items-center w-100'>
        <div className="btn-container w-50" style={{"justifyContent": sharedProperties.prevBtn["justifyContent"]}}>
          {
            properties.configuration.PreviousButton ? 
            <div className="btn" style={sharedProperties.prevBtn}>
              {sharedProperties.ButtonHoverStyle.PreviousButtonText}
            </div> :
            <></>
          }
        </div>
        <div className="btn-container w-50" style={{"justifyContent": sharedProperties.submitBtn["justifyContent"]}}>
          {
            properties.configuration.NextButton ? 
            (
              questionId == questions.length - 1 ? 
              <div className="btn" style={sharedProperties.submitBtn}>
                {sharedProperties.ButtonHoverStyle.SubmitButtonText}
              </div>:
              <div className="btn" style={sharedProperties.submitBtn}>
                {sharedProperties.ButtonHoverStyle.NextButtonText}
              </div>
            ) :
            <></>
          }
        </div>
      </div>
      <div className="edit-btns mt-2">
        <div className="d-flex align-items-center justify-content-start ">
          <div className="btn btn-primary d-flex justify-content-center align-items-center mx-2" onClick={newOption}>
            <MdAdd/>
            Add Option
          </div>
          <div className="btn btn-danger d-flex justify-content-center align-items-center mx-2" onClick={() => deleteQuestion(questionId)}>
            <MdClose />
            Delete Question
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
