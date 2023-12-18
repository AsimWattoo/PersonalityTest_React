// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { addQuestion } from "../redux/question";
import { Question, Option, setQuestions } from "../redux/question";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import TextCustomization from "../TextCustomization.js";
import QuestionCard from "../components/QuestionCard.js";
import { MdAdd, MdWarning } from "react-icons/md";
import PagesBar from "../components/PagesBar";
import { useParams } from "react-router";
import { updateProperty as updateSharedProperty, addProperty as addSharedProperty, removeProperty as removeSharedProperty } from "../redux/shared";
import loadData from "../helpers/dataLoader";
import Loader from "../components/Loader";

export default function QuestionsPage() {
  
  const params = useParams();
  let quiz = useAppSelector(state => state.quiz.quiz)
  const dispatch = useAppDispatch();
  const questions = useAppSelector(state => state.question.questions);
  const sharedProperties = useAppSelector(state => state.shared.properties);
  const personalities = useAppSelector(state => state.personality.personalities);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if(!quiz || !quiz.title) {
      setIsLoading(true);
      loadData(params.id, dispatch, () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 200);
      });
    }

  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);
  let getTransform = (slide) => {
    return (slide - currentSlide) * 100;
  }

  let createQuestion = () => {
    let question : Question = {
      properties: {
        background: {
          "backgroundColor": "#FFFFFF",
          'opacity': 1
        },
        mobileBackground: {
          "backgroundColor": "#FFFFFF",
          'opacity': 1
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
      {
        isLoading ? 
        <Loader /> : 
        <div className='content-container'>
          <div className="quiz-view-container">
            <div className='header-container'>
              <PagesBar currentPage={'questions'} quizId={params.id} canPreview={true} canEdit={false}/>
            </div>
            <div className="page-container">
              <div className={`left-column ${questions.length == 0 ? "w-100" : ""}`} >
                <div className={`slide-container ${questions.length == 0 ? "d-flex" : ""}`}>
                  {
                    questions.length == 0 || !sharedProperties ? 
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
                        style={{transform: `translateX(${getTransform(index)}%)`}} key={index}>
                          <div className="background" style={questions[index].properties.background}></div>
                          <QuestionCard changePage={changeSlide} 
                            sharedProperties={sharedProperties} 
                            properties={questions[index].properties} 
                            questions={questions} questionId={index}
                            personalities={personalities}/>
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
            </div>
          </div>
          {
            questions.length > 0 ? 
            <div className='right-column'>
              <TextCustomization title={'Question Background'} mainSection="question" propertySection={'background'} questions={questions} questionId={currentSlide}/>
              <TextCustomization title={'Question Mobile Background'} mainSection="question" propertySection={'mobileBackground'} questions={questions} questionId={currentSlide}/>
              <TextCustomization title={'Question Header'} mainSection="sharedProperties" propertySection={'heading'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty} />
              <TextCustomization title={'Option'} mainSection="sharedProperties" propertySection={'options'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
              <TextCustomization title={'Next Button'} mainSection="sharedProperties" propertySection={'submitBtn'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
              <TextCustomization title={'Prev Button'} mainSection="sharedProperties" propertySection={'prevBtn'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
              <TextCustomization title={'Button Hover Styles'} mainSection="sharedProperties" propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
              <TextCustomization title={'Configuration'} mainSection="question" propertySection={'configuration'} questions={questions} questionId={currentSlide}/>
              <TextCustomization title={'Option Hover Style'} mainSection="sharedProperties" propertySection={'OptionHoverStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
              <TextCustomization title={'Selected Option Style'} mainSection="sharedProperties" propertySection={'SelectedOptionStyle'} isShared={true} sharedProperties={sharedProperties} questionId={currentSlide} addSharedProperty={addSharedProperty} updateSharedProperty={updateSharedProperty} removeSharedProperty={removeSharedProperty}/>
            </div>
            : <></>
          }
        </div>
      }

    </div>
  );
}

// Styles
