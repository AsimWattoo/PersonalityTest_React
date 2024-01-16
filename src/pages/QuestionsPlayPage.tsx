// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import QuestionPreview from "../components/QuestionPreview.js";
import { useParams } from "react-router";
import loadData from "../helpers/dataLoader.js";
import Loader from "../components/Loader.js";

export default function QuestionsPlayPage() {
  
  let params = useParams();
  let dispatch = useAppDispatch();
  let quiz = useAppSelector(state => state.quiz.quiz);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared.properties);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if(!quiz || !quiz.title) {
      setIsLoading(true)
      loadData(params.id, dispatch, () => {
        setIsLoading(false);
      }, true);
    }

  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  let getTransform = (currentSlide, slide) => {
    return (slide - currentSlide) * 100;
  }

  let changeSlide = (slide) => {
    //If the next button is pressed
    if(slide > currentSlide) {
      let selectedOptions = questions[currentSlide].options.filter(option => option.selected);
      //If an option is selected only then move to the next question
      if(selectedOptions.length > 0) {
        setCurrentSlide(slide);
      }
    } else if(slide > -1){
      let currentQuestion = slide;
      while(true) {
        if(questions[currentQuestion].properties.dependency.hasDependency) {
          let dependencyQuestion = questions[questions[currentQuestion].properties.dependency.dependencyQuestion];
          let dependencyOption = dependencyQuestion.options[questions[currentQuestion].properties.dependency.dependencyOption];
          if(dependencyOption.selected) {
            setCurrentSlide(currentQuestion)
            break;
          } 

          if(currentQuestion == 0) {
            setCurrentSlide(0);
            break;
          }

          currentQuestion-=1;
        } else {
          setCurrentSlide(currentQuestion);
          break;
        }
      }
    }
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
      {
        isLoading ? 
        <Loader /> :
        <div className='content-container'>
          <div className='left-column' >
            <div className="slide-container">
              {
                questions.length > 0 && sharedProperties ? 
                questions.map((question, index) => {
                  return (
                    <div className={`slide ${currentSlide == index ? "slide-active" : ''}`} style={{transform: `translateX(${getTransform(currentSlide, index)}%)`, ...(windowWidth < 450 ? questions[index].properties.mobileBackground : questions[index].properties.background)}} key={index}>
                      <QuestionPreview sharedProperties={sharedProperties} properties={questions[index].properties} isPreview={false} questions={questions} questionId={index} changeQuestion={changeSlide}/>
                    </div>
                  )
                }) : 
                <></>
              }
            </div>
          </div>
        </div>
      }
    </div>
  );
}