// pages/quiz.js
"use client"; // pages/quiz.js
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import PagesBar from "../components/PagesBar.js";
import QuestionPreview from "../components/QuestionPreview.js";
import loadData from "../helpers/dataLoader.js";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import "./QuizPage.css";
import Loader from "../components/Loader.js";

export default function QuestionsPreviewPage() {
  
  let params = useParams();
  let dispatch = useAppDispatch();
  let quiz = useAppSelector(state => state.quiz.quiz);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared.properties);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    if(!quiz || !quiz.title) {
      setIsLoading(true);
      loadData(params.id, dispatch, () => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      });
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
      {
        isLoading ? 
        <Loader /> :
        <div className='content-container'>
          <div className="quiz-view-container">
            <div className='header-container'>
              <PagesBar currentPage={'questions'} quizId={params.id} canPreview={false} canEdit={true} canNavigate={false}/>
            </div>
            <div className="page-container">
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
        </div>
      }
    </div>
  );
}

// Styles
