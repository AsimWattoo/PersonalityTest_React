// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import TextCustomization from "../TextCustomization.js";
import QuestionPreview from "../components/QuestionPreview.js";
import { MdAdd } from "react-icons/md";
import { useParams } from "react-router";

export default function QuestionsPreviewPage() {
  
  let params = useParams();
  let id = parseInt(params.id);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared.properties);

  const [currentSlide, setCurrentSlide] = useState(0);

  let getTransform = (currentSlide, slide) => {
    return (slide - currentSlide) * 100;
  }

  let changeSlide = (slide) => {
    setCurrentSlide(slide);
  }

  return (
    <div className="page preview-page">
      <NavigationBar hasSubmitBtn={true} hasPreview={false} hasEditBtn={true}/>
      <div className='content-container'>
        <div className='left-column' >
          <div className="slide-container">
            {
              questions.map((question, index) => {
                return (
                  <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} style={{transform: `translateX(${getTransform(currentSlide, index)}%)`, ...questions[index].properties.background}} key={index}>
                    <QuestionPreview sharedProperties={sharedProperties} properties={questions[index].properties} questions={questions} questionId={index} changeQuestion={changeSlide}/>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// Styles
