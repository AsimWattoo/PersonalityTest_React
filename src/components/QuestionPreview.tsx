import React, {useState} from 'react';
import Option from './Option';
import { Navigate, useNavigate, useParams } from 'react-router';

// QuestionCard component
function QuestionPreview({properties, sharedProperties, questions, questionId, changeQuestion, isPreview = true}) {
  let navigate = useNavigate();
  let params = useParams();

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

  let getNextQuestion = () => {
    let currentQuestion = questionId + 1;
      while(true) {
        if(questions[currentQuestion].properties.dependency.hasDependency) {
          let dependencyQuestion = questions[questions[currentQuestion].properties.dependency.dependencyQuestion];
          let dependencyOption = dependencyQuestion.options[questions[currentQuestion].properties.dependency.dependencyOption];

          if(!dependencyOption) {
            return currentQuestion;
          }

          if(dependencyOption.selected) {
            return currentQuestion;
          } 

          if(currentQuestion == questions.length - 1) {
            return -1;
          }

          currentQuestion+=1;
        } else {
          return currentQuestion;
        }
      }
  }

  let canHaveNextQuestion = () => {
    let currentQuestion = questionId + 1;
    let questionType = questions[questionId].questionType;
      while(true) {
        if(questions[currentQuestion].properties.dependency.hasDependency) {
          
          if(questionType == "question") {
            if(questions[currentQuestion].properties.dependency.dependencyQuestion == questionId) {
              return currentQuestion;
            }
          } else {
            let dependencyQuestion = questions[questions[currentQuestion].properties.dependency.dependencyQuestion];
            let dependencyOption = dependencyQuestion.options[questions[currentQuestion].properties.dependency.dependencyOption];

            if(!dependencyOption) {
              return currentQuestion;
            }

            if(dependencyOption.selected) {
              return currentQuestion;
            }
          }

          if(currentQuestion == questions.length - 1) {
            return -1;
          }

          currentQuestion+=1;
        } else {
          return currentQuestion;
        }
      }
    }

  let nextQuestion = () => {

    let selectedOptions = questions[questionId].options.filter(option => option.selected);
    let questionType = questions[questionId].questionType;

    if(selectedOptions.length == 0 && questionType == "question") {
      return;
    }

    if(questionId < questions.length - 1)
    {
      let nextQuestion = getNextQuestion();
      if(nextQuestion == -1) {
        if(isPreview) {
          navigate(`/quiz/preview/winner/${params.id}`)
        } else {
          navigate(`/quiz/play/winner/${params.id}`)
        }
      }
      changeQuestion(nextQuestion);
    }
    else {
      if(isPreview) {
        navigate(`/quiz/preview/winner/${params.id}`)
      } else {
        navigate(`/quiz/play/winner/${params.id}`)
      }
    }
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

  let isLastQuestion = () => {
    if(questionId == questions.length - 1) {
      return true;
    } else {
      let nextQuestionId = canHaveNextQuestion();
      return nextQuestionId == -1;
    }
  }

  return (
    <div className="preview-question-container">
      <div className="question-header">
        <p style={sharedProperties.heading}>{questions[questionId].heading}</p>
      </div>
      <div className="options-container d-flex flex-column align-items-center mt-3">
        {
          questions[questionId].questionType == "question" ?
            questions[questionId].options.map((option, index) => <Option option={option} optionId={index} properties={sharedProperties} questionId={questionId} key={index} onClick={optionClicked}/>)
          : 
            <div style={sharedProperties.note}>
              {questions[questionId].note}
            </div>
        }
      </div>
      <div className='d-flex align-items-center'>
        <div className="btn-container w-100 d-flex" style={{"justifyContent": sharedProperties.prevBtn["justifyContent"]}} onClick={() => prevQuestion()}>
            {
              properties.configuration.PreviousButton && questionId > 0 ?
              <div className="btn" style={{...sharedProperties.prevBtn, ...previousBtnHoverState}} onMouseEnter={onPrevMouseEnter} onMouseLeave={onPrevMouseLeave}>
                {sharedProperties.ButtonHoverStyle.PreviousButtonText}
              </div>
              : <></>
            }
        </div>
        <div className="btn-container w-100 d-flex" style={{"justifyContent": sharedProperties.submitBtn["justifyContent"]}} onClick={() => nextQuestion()}>
            {
              properties.configuration.NextButton ? 
              <div className="btn" style={{...sharedProperties.submitBtn, ...nextBtnHoverState}} onMouseEnter={onNextMouseEnter} onMouseLeave={onNextMouseLeave}>
                {
                  isLastQuestion() ? 
                  sharedProperties.ButtonHoverStyle.SubmitButtonText :
                  sharedProperties.ButtonHoverStyle.NextButtonText
                }
              </div> : <></>
            }
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
