// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import { useNavigate, useParams } from "react-router";

export default function PresentationPreviewPage() {
  
    let params = useParams();
    let id = params.id;
    let [windowWidth, setWindowWidth] = useState(600);
    let quizProperties = useAppSelector(state => state.presentation.properties);
    const quiz = useAppSelector(state => state.quiz.quiz);

    let navigate = useNavigate();
    let [startBtnHoverState, setStartBtnHoverState] = useState({
        backgroundColor: quizProperties.startBtn.backgroundColor,
        color: quizProperties.startBtn.color
      });

    let startQuiz = () => {
        navigate(`/quiz/preview/questions/${id}`);
    }

    let onStartMouseEnter = () => {
        if(quizProperties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quizProperties.ButtonHoverStyle.StartButtonHoverColor,
            color: quizProperties.ButtonHoverStyle.StartButtonHoverTextColor
          })
        }
      }
    
      useEffect(() => {
        setWindowWidth(window.innerWidth)
      })

      let onStartMouseLeave = () => {
        if(quizProperties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quizProperties.startBtn.backgroundColor,
            color: quizProperties.startBtn.color
          })
        }
      }

    window.onresize = () => {
        setWindowWidth(window.innerWidth)
    }
    
    return (
        <div className="page preview-page">
            <NavigationBar hasSubmitBtn={true} hasPreview={false} hasEditBtn={true} hasCancelBtn={true}/>
            <div className='content-container'>
                <div className='left-column'>
                    <div className="page-content" style={windowWidth < 450 ? quizProperties.mobileBackground : quizProperties.background}>
                        <div style={quizProperties.presentationImage}></div>
                        <div className="w-50" style={quizProperties.heading}>{quiz.title}</div>
                        <div className="w-50" style={quizProperties.description}>{quiz.description}</div>
                        <div style={{"justifyContent": quizProperties.startBtn["justifyContent"], "width": "50%", "display": "flex"}}>
                            <a className='btn btn-primary' style={{...quizProperties.startBtn, ...startBtnHoverState}} onClick={startQuiz} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                {quizProperties.ButtonHoverStyle.StartButtonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Styles
