// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import TextCustomization from "../TextCustomization.js";
import QuestionPreview from "../components/QuestionPreview.js";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router";
import loadData from "../helpers/dataLoader.js";

export default function QuestionsPreviewPage() {
  
  let params = useParams();
  let dispatch = useAppDispatch();
  let quiz = useAppSelector(state => state.quiz.quiz);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared.properties);

  useEffect(() => {

    if(!quiz || !quiz.title) {
      loadData(params.id, dispatch);
    }

  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  let getTransform = (currentSlide, slide) => {
    return (slide - currentSlide) * 100;
  }

  let changeSlide = (slide) => {
    setCurrentSlide(slide);
  }

  let [windowWidth, setWindowWidth] = useState(600);

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  })

  window.onresize = () => {
    setWindowWidth(window.innerWidth)
  }

  return (
    <div className="page preview-page">
      <NavigationBar hasSubmitBtn={true} hasPreview={false} hasEditBtn={true} hasCancelBtn={true}/>
      <div className='content-container'>
        <div className='left-column' >
          <div className="slide-container">
            {
              questions.length > 0 && sharedProperties ? 
              questions.map((question, index) => {
                return (
                  <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} style={{transform: `translateX(${getTransform(currentSlide, index)}%)`, ...(windowWidth < 450 ? questions[index].properties.mobileBackground : questions[index].properties.background)}} key={index}>
                    <QuestionPreview sharedProperties={sharedProperties} properties={questions[index].properties} questions={questions} questionId={index} changeQuestion={changeSlide}/>
                  </div>
                )
              }) : 
              <></>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
