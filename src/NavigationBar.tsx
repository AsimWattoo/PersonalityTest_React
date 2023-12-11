import React from 'react';
import { MdEdit, MdSettings, MdVisibility } from 'react-icons/md';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { updateProperty as updatePresentationProperty } from './redux/presentationProperties';
import type { PropertyUpdate } from './redux/question';
import { updateQuestions, updateProperties, updatePresentationProperties } from './redux/quiz';
import type { QuestionUpdate, PropertiesUpdate } from './redux/quiz';
import { sendRequest } from './helpers/request';
import Urls from './links';
import { resetFiles } from './redux/files';

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
  let files = useAppSelector(state => state.files.files);
  let dispatch = useAppDispatch();
  
  let uploadFiles = async (presentationProperties: {}, sharedProperties: {}, questions: []) => {
    for(let file of files) {
      if(file.state == "added") {
        let result = await fetch(file.url);
        let blob = await result.blob();
        let newFile = new File([blob], file.fileName);
        let formData = new FormData();
        formData.append("file", newFile);
        formData.append("type", "image")
        let response = await sendRequest(Urls.uploadFile.url(), Urls.uploadFile.type, formData, "", false);
        if(!response.error) {
          //If the image file belongs to the shared properties
          if(file.mainSection == "presentationProperties" && presentationProperties) {
            presentationProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
          } else if(file.mainSection == "sharedProperties" && sharedProperties) {
            sharedProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
          } else if(file.mainSection == "question" && file.questionIndex !== undefined && questions) {
            questions[file.questionIndex].properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`;
          }
        }
      } else if (file.state == "removed") {
        let response = await sendRequest(Urls.deleteFileByName.url(file.fileName), Urls.deleteFileByName.type);
      }
    }
    dispatch(resetFiles({}));
  }

  let onSave = async () => {
    if(params.id) {
      let id = params.id;
      let preProperties = JSON.parse(JSON.stringify(presentationProperties));
      let shProperties = JSON.parse(JSON.stringify(sharedProperties));
      let questionObjs = questions.map(question => {
        return {
          quizId: id,
          heading: question.heading,
          options: question.options,
          properties: JSON.parse(JSON.stringify(question.properties))
        }
      })
      await uploadFiles(preProperties, shProperties, questionObjs);

      //Sending Update Request to the server
      let response = await sendRequest(Urls.updateQuiz.url(id), Urls.updateQuiz.type, {
        title: quiz?.title,
        description: quiz?.description,
        presentationProperties: JSON.stringify(preProperties),
        sharedProperties: JSON.stringify(shProperties),
        isDraft: false,
      });

      if(!response.error) {
        let deleteQuizQuestions = await sendRequest(Urls.deleteQuizQuestions.url(id), Urls.deleteQuizQuestions.type);
        console.log(deleteQuizQuestions);
        if(deleteQuizQuestions.error) {
          console.log(deleteQuizQuestions.error)
        }
        else {
          questionObjs = questionObjs.map(question => {
            return {
              quizId: id,
              heading: question.heading,
              options: question.options,
              properties: JSON.stringify(question.properties)
            }
          })
          let createQuizResponse = await sendRequest(Urls.createQuestions.url(id), Urls.createQuestions.type, questionObjs);
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
            <div className='btn btn-primary' onClick={() => navigate("/settings/fonts")}>
              <MdSettings />
            </div>
          </div>
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
