// pages/quiz.js
"use client"; // pages/quiz.js
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks.js";
import "./QuizPage.css";
import { MdAdd, MdArrowBack, MdClose, MdWarning } from "react-icons/md";
import PagesBar from "../components/PagesBar.js";
import { useParams } from "react-router";
import loadData from "../helpers/dataLoader.js";
import Loader from "../components/Loader.js";
import CheckBox from "../components/checkbox.js";
import { addQuestion, updateQuestion, deleteQuestion } from "../redux/registration.js";
import type { RegistrationQuestion, RegistrationQuestionUpdate } from "../redux/registration.js";

export default function RegistrationPage() {
  
  const params = useParams();
  let quiz = useAppSelector(state => state.quiz.quiz)
  let regQuestions = useAppSelector(state => state.registration.questions);
  const dispatch = useAppDispatch();
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if(!quiz || !quiz.title) {
      setIsLoading(true);
      loadData(params.id, dispatch, () => {
        setIsLoading(false);
      });
    }
  }, []);

  let addNewQuestion = () => {
    dispatch(addQuestion({
        id: "",
        text: "",
    }))
  }

  let removeQuestion = (index: number) => {
    dispatch(deleteQuestion(index));
  }

  let setText = (index: number, text: string) => {
    if(regQuestions) {
        dispatch(updateQuestion({
            index: index,
            text: text,
            id: regQuestions[index].id
        }))
    }
  }

  return (
    <div className="page registration-page">
      {
        isLoading ? 
        <Loader /> : 
        <div className='content-container'>
          <div className="quiz-view-container">
            <div className='header-container'>
              <PagesBar currentPage={'registration'} quizId={params.id} canPreview={true} canEdit={false}/>
            </div>
            <div className="page-container">
              <div className={`left-column`}>
                <div className="registration-form-container">
                    <div className="registration-form">
                        <div className="input-group">
                            <label>Nimi</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="input-group">
                            <label>Puhelinnumero</label>
                            <input type="text" className="form-control"/>
                        </div>
                        <div className="input-group">
                            <label>Sähköposti</label>
                            <input type="email" className="form-control"/>
                        </div>
                        {
                            regQuestions?.map((question, index) => {
                                return (
                                <div className="input-group editable" key={index}>
                                    <div className="d-flex align-items-center">
                                        <input type="text" value={question.text} placeholder="Enter Question" onChange={e => setText(index, e.currentTarget.value)}/>
                                        <div className="danger-text-btn" onClick={() => removeQuestion(index)}>
                                            <MdClose />
                                        </div>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Enter Answer" disabled/>
                                </div>
                                )
                            })
                        }
                        <div className="add-new-question" onClick={addNewQuestion}>
                            <MdAdd /> Add New Question
                        </div>
                        <div className="input-group horizontal">
                            <CheckBox />
                            <label>Olen lukenut säännöt ja hyväksyn ne.</label>
                        </div>
                        <div className="btn-container">
                            <div className="primary-btn">
                              Osallistu
                            </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </div>
  );
}
