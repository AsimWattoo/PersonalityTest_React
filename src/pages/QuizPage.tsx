// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { addQuestion } from "../redux/question";
import { Question, Option } from "../redux/question";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import TextCustomization from "../TextCustomization.js";
import QuestionCard from "../components/QuestionCard.js";
import { MdAdd, MdWarning } from "react-icons/md";
import PagesBar from "../components/PagesBar";
import { useParams } from "react-router";
export default function QuizPage() {
  
  const params = useParams();
  const dispatch = useAppDispatch();
  const questions = useAppSelector(state => state.question.questions);
  const sharedProperties = useAppSelector(state => state.shared.properties);

  const [currentSlide, setCurrentSlide] = useState(0);
  let getTransform = (slide) => {
    return (slide - currentSlide) * 100;
  }

  let createQuestion = () => {
    let question : Question = {
      properties: {
        background: {
          "backgroundColor": "#FFFFFF"
        },
        configuration: {
          NextButton: true,
          PreviousButton: true,
        },
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
        <PagesBar currentPage={'questions'} quizId={params.id}/>
        <div className={`left-column ${questions.length == 0 ? "w-100" : ""}`} >
          <div className={`slide-container ${questions.length == 0 ? "d-flex" : ""}`}>
            {
              questions.length == 0 ? 
              <div className={`slide w-100`}>
                <div className="no-question">
                  <MdWarning />
                  <div>
                    No Question has been added
                  </div>
                  <div>
                    Use the <strong>add button</strong> below to add your first question
                  </div>
                </div>
              </div> : 
              questions.map((question, index) => {
                return (
                  <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} 
                  style={{transform: `translateX(${getTransform(index)}%)`, ...questions[index].properties.background}} key={index}>
                    <QuestionCard changePage={changeSlide} sharedProperties={sharedProperties} properties={questions[index].properties} questions={questions} questionId={index}/>
                  </div>
                )
              })
            }
          </div>
          <div className="navigation-bar">
            {
              questions.map((question, index) => {
                return (
                  <div key={index} className={`item ${currentSlide == index ? 'active' : ''}`} onClick={() => changeSlide(index)}>
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
            <TextCustomization title={'Question Header'} propertySection={'heading'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} />
            <TextCustomization title={'Option'} propertySection={'options'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} />
            <TextCustomization title={'Next Button'} propertySection={'submitBtn'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide}/>
            <TextCustomization title={'Prev Button'} propertySection={'prevBtn'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide}/>
            <TextCustomization title={'Button Hover Styles'} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide}/>
            <TextCustomization title={'Configuration'} propertySection={'configuration'} questions={questions} questionId={currentSlide}/>
            <TextCustomization title={'Option Hover Style'} propertySection={'OptionHoverStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide}/>
            <TextCustomization title={'Selected Option Style'} propertySection={'SelectedOptionStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide}/>
          </div>
          : <></>
        }
      </div>
    </div>
  );
}

// Styles
