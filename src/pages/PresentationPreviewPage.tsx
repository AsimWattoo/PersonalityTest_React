// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppSelector } from "../redux/hooks.js";
import NavigationBar from "../NavigationBar.js";
import "./QuizPage.css";
import { useNavigate, useParams } from "react-router";

export default function PresentationPreviewPage() {
  
    let params = useParams();
    let id = parseInt(params.id);
    const quiz = useAppSelector(state => state.quiz.quizes.filter(quiz => quiz.id == id)[0]);
    let navigate = useNavigate();
    let [startBtnHoverState, setStartBtnHoverState] = useState({
        backgroundColor: quiz.presentationProperties.properties.startBtn.backgroundColor,
        color: quiz.presentationProperties.properties.startBtn.color
      });

    let startQuiz = () => {
        navigate(`/quiz/preview/questions/${id}`);
    }

    let onStartMouseEnter = () => {
        if(quiz.presentationProperties.properties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quiz.presentationProperties.properties.ButtonHoverStyle.StartButtonHoverColor,
            color: quiz.presentationProperties.properties.ButtonHoverStyle.StartButtonHoverTextColor
          })
        }
      }
    
      let onStartMouseLeave = () => {
        if(quiz.presentationProperties.properties.startBtn.backgroundColor) {
            setStartBtnHoverState({
            backgroundColor: quiz.presentationProperties.properties.startBtn.backgroundColor,
            color: quiz.presentationProperties.properties.startBtn.color
          })
        }
      }
    
    return (
        <div className="page preview-page">
            <NavigationBar hasSubmitBtn={true} hasPreview={false} hasEditBtn={true} hasCancelBtn={true}/>
            <div className='content-container'>
                <div className='left-column'>
                    <div className="page-content" style={quiz.presentationProperties.properties.background}>
                        <div style={quiz.presentationProperties.properties.heading}>{quiz.title}</div>
                        <div style={quiz.presentationProperties.properties.description}>{quiz.description}</div>
                        <div style={{"justifyContent": quiz.presentationProperties.properties.startBtn["justifyContent"], "width": "50%", "display": "flex"}}>
                            <a className='btn btn-primary' style={{...quiz.presentationProperties.properties.startBtn, ...startBtnHoverState}} onClick={startQuiz} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                {quiz.presentationProperties.properties.ButtonHoverStyle.StartButtonText}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Styles
