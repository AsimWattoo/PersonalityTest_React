import React, {useState} from 'react';
import Option from './Option';

// QuestionCard component
function QuestionPreview({properties, sharedProperties, questions, questionId, changeQuestion}) {

  let [previousBtnHoverState, setPreviousBtnHoverState] = useState({
    backgroundColor: sharedProperties.prevBtn.backgroundColor,
    color: sharedProperties.prevBtn.color
  });

  let [nextBtnHoverState, setNextBtnHoverState] = useState({
    backgroundColor: sharedProperties.submitBtn.backgroundColor,
    color: sharedProperties.submitBtn.color
  });
  
  let onPrevMouseEnter = () => {
    if(sharedProperties.prevBtn.backgroundColor) {
      setPreviousBtnHoverState({
        backgroundColor: sharedProperties.ButtonHoverStyle.PreviousButtonHoverColor,
        color: sharedProperties.ButtonHoverStyle.PreviousButtonHoverTextColor
      })
    }
  }

  let onPrevMouseLeave = () => {
    if(sharedProperties.prevBtn.backgroundColor) {
      setPreviousBtnHoverState({
        backgroundColor: sharedProperties.prevBtn.backgroundColor,
        color: sharedProperties.prevBtn.color
      })
    }
  }

  let onNextMouseEnter = () => {
    if(sharedProperties.submitBtn.backgroundColor) {
      setNextBtnHoverState({
        backgroundColor: sharedProperties.ButtonHoverStyle.NextButtonHoverColor,
        color: sharedProperties.ButtonHoverStyle.NextButtonHoverTextColor
      })
    }
  }

  let onNextMouseLeave = () => {
    if(sharedProperties.submitBtn.backgroundColor) {
      setNextBtnHoverState({
        backgroundColor: sharedProperties.submitBtn.backgroundColor,
        color: sharedProperties.submitBtn.color
      })
    }
  }

  let nextQuestion = () => {
    if(questionId < questions.length - 1)
      changeQuestion(questionId + 1)
  }

  let prevQuestion = () => {
    if(questionId > 0)
      changeQuestion(questionId - 1)
  }

  let optionClicked = () => {
    if(!properties.configuration.NextButton) {
      nextQuestion();
    }
  }

  return (
    <div className="preview-question-container">
      <div className="question-header">
        <p style={sharedProperties.heading}>{questions[questionId].heading}</p>
      </div>
      <div className="options-container d-flex flex-column align-items-center mt-3">
        {
          questions[questionId].options.map((option, index) => <Option option={option} optionId={index} properties={sharedProperties} questionId={questionId} key={index} onClick={optionClicked}/>)
        }
      </div>
      <div className='d-flex align-items-center'>
        <div className="btn-container w-50" style={{"justifyContent": sharedProperties.prevBtn["justifyContent"]}} onClick={() => prevQuestion()}>
            {
              properties.configuration.PreviousButton && questionId > 0 ?
              <div className="btn" style={{...sharedProperties.prevBtn, ...previousBtnHoverState}} onMouseEnter={onPrevMouseEnter} onMouseLeave={onPrevMouseLeave}>
                {sharedProperties.ButtonHoverStyle.PreviousButtonText}
              </div>
              : <></>
            }
        </div>
        <div className="btn-container w-50" style={{"justifyContent": sharedProperties.submitBtn["justifyContent"]}} onClick={() => nextQuestion()}>
            {
              properties.configuration.NextButton ? 
              (questionId == questions.length - 1 ?
              <div className="btn" style={{...sharedProperties.submitBtn, ...nextBtnHoverState}} onMouseEnter={onNextMouseEnter} onMouseLeave={onNextMouseLeave}>
                {sharedProperties.ButtonHoverStyle.SubmitButtonText}
              </div>
              : <div className="btn" style={{...sharedProperties.submitBtn, ...nextBtnHoverState}} onMouseEnter={onNextMouseEnter} onMouseLeave={onNextMouseLeave}>
                {sharedProperties.ButtonHoverStyle.NextButtonText}
              </div>) : <></>
            }
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
