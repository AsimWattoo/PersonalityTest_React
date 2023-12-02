import React from 'react';
import {MdAdd, MdClose, MdDelete} from 'react-icons/md';

// QuestionCard component
function QuestionPreview({properties, questions, questionId, changeQuestion}) {

  let nextQuestion = () => {
    if(questionId < questions.length - 1)
      changeQuestion(questionId + 1)
  }

  let prevQuestion = () => {
    if(questionId > 0)
      changeQuestion(questionId - 1)
  }

  return (
    <div className="preview-question-container">
      <div className="question-header">
        <p style={properties.heading}>{questions[questionId].heading}</p>
      </div>
      <div className="options-container d-flex flex-column align-items-center mt-3">
        {
          questions[questionId].options.map((option, index) => {
            return (
              <div className="option-container">
                <p style={properties.options}>{option.text}</p>
              </div>
            )
          })
        }
      </div>
      <div className='d-flex align-items-center'>
        <div className="btn-container w-50" style={{"justifyContent": properties.prevBtn["justifyContent"]}} onClick={() => prevQuestion()}>
            {
              questionId > 0 ?
              <div className="btn" style={properties.prevBtn}>
                Prev
              </div>
              : <></>
            }
        </div>
        <div className="btn-container w-50" style={{"justifyContent": properties.submitBtn["justifyContent"]}} onClick={() => nextQuestion()}>
            {
              questionId == questions.length - 1 ?
              <div className="btn" style={properties.submitBtn}>
                Submit
              </div>
              : <div className="btn" style={properties.submitBtn}>
                Next
              </div> 
            }
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
