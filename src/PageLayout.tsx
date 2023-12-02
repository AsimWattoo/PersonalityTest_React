// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { addQuestion } from "./redux/question";
import { Question, Option } from "./redux/question";
import { useAppDispatch, useAppSelector } from "./redux/hooks.js";
import NavigationBar from "./NavigationBar.js";
import "./PageLayout.css";
import TextCustomization from "./TextCustomization.js";
import QuestionCard from "./components/QuestionCard.js";
import { MdAdd } from "react-icons/md";
function createDefaultStyle (fontSize) {
  return {
    "fontFamily": "Arial",
    "fontStyle": "normal",
    "fontSize": fontSize,
    "fontWeight": 400,
    "textAlign": "left",
    "color": '#000000',
    "borderColor": '#dedede',
    "borderWidth": 1,
    "borderStyle": "Solid",
    "borderRadius": 5,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 8,
    "paddingRight": 8,
    "paddingBottom": 8,
    "paddingLeft": 8,
    "backgroundColor": "#FFFFFF",
  }
}

function createButtonStyle (fontSize) {
  return {
    "fontFamily": "Arial",
    "fontStyle": "normal",
    "fontSize": fontSize,
    "fontWeight": 400,
    "justifyContent": "left",
    "color": '#000000',
    "borderColor": '#dedede',
    "borderWidth": 1,
    "borderStyle": "Solid",
    "borderRadius": 5,
    "marginTop": 0,
    "marginRight": 0,
    "marginBottom": 0,
    "marginLeft": 0,
    "paddingTop": 8,
    "paddingRight": 8,
    "paddingBottom": 8,
    "paddingLeft": 8,
    "backgroundColor": "#FFFFFF",
  }
}

export default function QuizPage() {
  
  const questions = useAppSelector(state => state.question.questions);
  const dispatch = useAppDispatch();

  const [currentSlide, setCurrentSlide] = useState(0);

  let getTransform = (slide) => {
    return slide * -100 + 15;
  }

  let createQuestion = () => {
    let question : Question = {
      properties: {
        heading: createDefaultStyle(24),
        options: createDefaultStyle(18),
        background: {
          "backgroundColor": "#FFFFFF"
        },
        submitBtn: createButtonStyle(18),
        prevBtn: createButtonStyle(18),
      },
      options: [],
      heading: ""
    }
    dispatch(addQuestion(question))
  }

  let changeSlide = (slide) => {
    setCurrentSlide(slide);
  }

  return (
    <div className="page">
      <NavigationBar hasSubmitBtn={true} hasPreview={true} hasEditBtn={false}/>
      <div className='content-container'>
        <div className='left-column' >
          <div className="slide-container">
            {
              questions.map((question, index) => {
                return (
                  <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} style={{transform: `translateX(${getTransform(currentSlide)}%)`, ...questions[index].properties.background}} key={index}>
                    <QuestionCard changePage={changeSlide} properties={questions[index].properties} questions={questions} questionId={index}/>
                  </div>
                )
              })
            }
          </div>
          <div className="navigation-bar">
            {
              questions.map((question, index) => {
                return (
                  <div className={`item ${currentSlide == index ? 'active' : ''}`} onClick={() => changeSlide(index)}>
                    {index + 1}
                  </div>
                )
              })
            }
            <div className="item" onClick={createQuestion}>
              <MdAdd />
            </div>
          </div>
        </div>
        {
          questions.length > 0 ? 
          <div className='right-column'>
            <TextCustomization title={'Question Background'} propertySection={'background'} questions={questions} questionId={currentSlide}/>
            <TextCustomization title={'Question Header'} propertySection={'heading'} questions={questions} questionId={currentSlide} />
            <TextCustomization title={'Option'} propertySection={'options'} questions={questions} questionId={currentSlide} />
            <TextCustomization title={'Next Button'} propertySection={'submitBtn'} questions={questions} questionId={currentSlide}/>
            <TextCustomization title={'Prev Button'} propertySection={'prevBtn'} questions={questions} questionId={currentSlide}/>
          </div>
          : <></>
        }
      </div>
    </div>
  );
}

// Styles
