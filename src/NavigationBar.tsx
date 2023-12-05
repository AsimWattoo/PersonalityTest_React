import React from 'react';
import { MdEdit, MdVisibility } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { updateQuestions, updateProperties, updatePresentationProperties } from './redux/quiz';
import type { QuestionUpdate, PropertiesUpdate } from './redux/quiz';

type NavigateProps = {
  hasSubmitBtn: boolean,
  hasPreview: boolean,
  hasEditBtn: boolean
}

function NavigationBar({hasSubmitBtn, hasPreview, hasEditBtn}: NavigateProps) {

  let navigate = useNavigate();
  let params = useParams();

  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared);
  let presentationProperties = useAppSelector(state => state.presentation);
  let dispatch = useAppDispatch();

  let onSave = () => {
    if(params.id) {
      let id = parseInt(params.id);
      let questionUpdate: QuestionUpdate = {
        quizId: id,
        questions: questions
      }

      dispatch(updateQuestions(questionUpdate));

      let propertiesUpdate: PropertiesUpdate = {
        quizId: id,
        properties: sharedProperties.properties
      }
      dispatch(updateProperties(propertiesUpdate))

      let presentationPropertiesUpdate: PropertiesUpdate = {
        quizId: id,
        properties: presentationProperties.properties
      }
      dispatch(updatePresentationProperties(presentationPropertiesUpdate))
    }
  }

  let previewQuiz = () => {
    navigate(`/quiz/preview/presentation/${params.id}`);
  }

  let editQuiz = () => {
    navigate(`/quiz/presentation/${params.id}`);
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
          </div>
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
