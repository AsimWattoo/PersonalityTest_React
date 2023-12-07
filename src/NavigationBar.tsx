import React from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { updateQuestions, updateProperties, updatePresentationProperties } from './redux/quiz';
import type { QuestionUpdate, PropertiesUpdate } from './redux/quiz';
import { sendRequest } from './helpers/request';
import Urls from './links';

type NavigateProps = {
  hasSubmitBtn: boolean,
  hasPreview: boolean,
  hasEditBtn: boolean,
  hasCancelBtn: boolean
}

function NavigationBar({hasSubmitBtn, hasPreview, hasEditBtn, hasCancelBtn}: NavigateProps) {

  let navigate = useNavigate();
  let params = useParams();

  let quiz = useAppSelector(state => state.quiz.quiz);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared);
  let presentationProperties = useAppSelector(state => state.presentation);
  let dispatch = useAppDispatch();

  let onSave = async () => {
    if(params.id) {
      let id = params.id;
      //Sending Update Request to the server
      let response = await sendRequest(Urls.updateQuiz.url(id), Urls.updateQuiz.type, {
        title: quiz?.title,
        description: quiz?.description,
        presentationProperties: JSON.stringify(presentationProperties),
        sharedProperties: JSON.stringify(sharedProperties),
        isDraft: false,
      });

      if(!response.error) {
        let deleteQuizQuestions = await sendRequest(Urls.deleteQuizQuestions.url(id), Urls.deleteQuizQuestions.type);
        console.log(deleteQuizQuestions);
        if(deleteQuizQuestions.error) {
          console.log(deleteQuizQuestions.error)
        }
        else {
          let questionObjs = questions.map(question => {
            return {
              quizId: id,
              heading: question.heading,
              options: question.options,
              properties: JSON.stringify(question.properties)
            }
          })
          let createQuizResponse = await sendRequest(Urls.createQuestions.url(id), Urls.createQuestions.type, questionObjs);
          console.log(createQuizResponse)
        }
      }
      else {
        console.log(response.error)
      }

    }
  }

  let previewQuiz = () => {
    navigate(`/quiz/preview/presentation/${params.id}`);
  }

  let editQuiz = () => {
    navigate(`/quiz/presentation/${params.id}`);
  }

  let onCancel = () => {
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between" style={{width: "100%"}}>
      <div className="container-fluid px-10"> {/* Use "px-0" to remove horizontal padding */}
        <h1 className="navbar-brand me-auto cursor-pointer" onClick={() => navigate("/")}>
          <span style={{ color: '#FFD700' }}>Personality</span> Test
        </h1>
        {
          <div className="d-flex align-items-center">
            {
              hasEditBtn ? 
              <button className="btn btn-primary mx-2 d-flex align-items-center" type="submit" onClick={editQuiz }>
                <div className="me-2"><MdEdit /></div>
                Edit
              </button> :
              <></>
            }
            {
              hasPreview ? 
              <button className="btn btn-primary mx-2 d-flex align-items-center" type="submit" onClick={previewQuiz}>
                <div className="me-2"><MdVisibility /></div>
                Preview
              </button> :
              <></>
            }
            {
              hasSubmitBtn ? 
              <button className="btn btn-primary mx-2" type="submit" onClick={onSave}>
                Save
              </button> :
              <></>
            }
            {
              hasCancelBtn ? 
              <button className="btn btn-secondary mx-2" type="submit" onClick={onCancel}>
                Cancel
              </button> :
              <></>
            }
          </div>
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
