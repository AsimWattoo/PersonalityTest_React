// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import Question from "./QuestionCard.js";
import NavigationBar from "./NavigationBar.js";
import "./PageLayout.css";
import TextCustomization from "./TextCustomization.js";
import QuestionCard from "./QuestionCard.js";
import { MdAdd } from "react-icons/md";

function createDefaultStyle () {
  return {
    "fontFamily": "Arial",
    "fontStyle": "normal",
    "fontSize": 24,
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


export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  let getTransform = (slide) => {
    return slide * -100 + 20;
  }

  let addQuestion = () => {
    let newQuestions = [...questions, {
      properties: {
        heading: createDefaultStyle(),
        options: createDefaultStyle(),
        background: {
          "backgroundColor": "#FFFFFF"
        }
      }
    }];
    setQuestions(newQuestions);
  }

  let changeSlide = (slide) => {
    setCurrentSlide(slide);
  }

  useEffect(() => {
    console.log(questions)
  }, [questions])

  return (
    <div className="page">
      <NavigationBar hasSubmitBtn={true}/>
      <div className='content-container'>
        <div className='left-column' >
          <div className="slide-container">
            {
              questions.map((question, index) => {
                return (
                  <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} style={{transform: `translateX(${getTransform(currentSlide)}%)`, ...questions[index].properties.background}} key={index}>
                    <QuestionCard properties={questions[index].properties}/>
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
            <div className="item" onClick={addQuestion}>
              <MdAdd />
            </div>
          </div>
        </div>
        {
          questions.length > 0 ? 
          <div className='right-column'>
            <TextCustomization title={'Question Background'} propertySection={'background'} questions={questions} questionId={currentSlide} setQuestions={setQuestions}/>
            <TextCustomization title={'Question Header'} propertySection={'heading'} questions={questions} questionId={currentSlide} setQuestions={setQuestions}/>
            <TextCustomization title={'Option'} propertySection={'options'} questions={questions} questionId={currentSlide} setQuestions={setQuestions}/>
          </div>
          : <></>
        }
      </div>
    </div>
  );
}

// Styles
