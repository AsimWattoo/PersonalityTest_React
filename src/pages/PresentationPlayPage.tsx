// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import { useNavigate, useParams } from "react-router";

export default function PresentationPlayPage() {
  
    let params = useParams();
    let id = parseInt(params.id);
    let quizProperties = useAppSelector(state => state.presentation.properties);
    const quiz = useAppSelector(state => state.quiz.quizes.filter(quiz => quiz.id == id)[0]);
    let navigate = useNavigate();
    let [startBtnHoverState, setStartBtnHoverState] = useState({
        backgroundColor: quizProperties.startBtn.backgroundColor,
        color: quizProperties.startBtn.color
      });

    let startQuiz = () => {
        navigate(`/quiz/play/questions/${id}`);
    }

    let onStartMouseEnter = () => {
        if(quizProperties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quizProperties.ButtonHoverStyle.StartButtonHoverColor,
            color: quizProperties.ButtonHoverStyle.StartButtonHoverTextColor
          })
        }
      }
    
      let onStartMouseLeave = () => {
        if(quizProperties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quizProperties.startBtn.backgroundColor,
            color: quizProperties.startBtn.color
          })
        }
      }
    
    return (
        <div className="page preview-page">
            <NavigationBar hasSubmitBtn={false} hasPreview={false} hasEditBtn={false} hasCancelBtn={false}/>
            <div className='content-container'>
                <div className='left-column'>
                    <div className="page-content" style={quizProperties.background}>
                        <div style={quizProperties.presentationImage}></div>
                        <div style={quizProperties.heading}>{quiz.newTitle}</div>
                        <div style={quizProperties.description}>{quiz.newDescription}</div>
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
