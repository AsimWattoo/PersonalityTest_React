import React from 'react';
import { MdCancel, MdEdit, MdOutlineCancel, MdOutlineEdit, MdOutlinePublic, MdOutlinePublish, MdOutlineSave, MdOutlineVisibility, MdPublish, MdSave, MdVisibility } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { sendRequest } from '../helpers/request';
import Urls from '../links';
import { resetFiles } from '../redux/files';
import { initializeProperties as initializeSharedProperties } from '../redux/shared';
import { initializeProperties as initializePresentationProperties } from '../redux/presentationProperties';
import { setQuestions } from '../redux/question';

type PagesBarProps = {
  currentPage: string,
  quizId: string,
  canPreview: boolean,
  canEdit: boolean,
  canNavigate: boolean
}

let PagesBar = ({currentPage, quizId, canPreview = false, canEdit = false, canNavigate = true}:PagesBarProps) => {

  let navigate = useNavigate();

  let onPresentationPageClick = () => {
      if(canNavigate) {
        navigate(`/quiz/presentation/${quizId}`)
      }
  }

  let onQuestionsPageClick = () => {
      if(canNavigate) {
        navigate(`/quiz/questions/${quizId}`)
      }
  }

  let onPersonalityClick = () => {
    navigate(`/quiz/personality/${quizId}`)
  }

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
        formData.append("quizId", quizId);
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

  let onSave = async (draft: boolean) => {
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
        isDraft: draft,
      });

      if(!response.error) {
        let deleteQuizQuestions = await sendRequest(Urls.deleteQuizQuestions.url(id), Urls.deleteQuizQuestions.type);
        console.log(deleteQuizQuestions);
        if(deleteQuizQuestions.error) {
          console.log(deleteQuizQuestions.error)
        }
        else {
          dispatch(initializeSharedProperties(shProperties.properties));
          dispatch(initializePresentationProperties(preProperties.properties));
          dispatch(setQuestions(questionObjs));

          questionObjs = questionObjs.map(question => {
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
      <div className='header'>
        <div className='tabs'>
          <div className={`tab ${currentPage == "presentation" ? 'active' : ''}`} onClick={onPresentationPageClick}>
            Presentation Page
          </div>
          <div className={`tab ${currentPage == "questions" ? 'active' : ''}`} onClick={onQuestionsPageClick}>
            Questions Page
          </div>
          <div className='tab'>
            Winners Page
          </div>
          <div className='tab'>
            Loosers Page
          </div>
          <div className={`tab ${currentPage == "personality" ? 'active' : ''}`} onClick={onPersonalityClick}>
            Personalities Page
          </div>
        </div>
        <div className='d-flex align-items-center'>
          {
            canPreview ? 
            <div className='primary-text-btn me-1' onClick={previewQuiz}>
              <MdOutlineVisibility />
            </div> : <></>
          }
          {
            canEdit ? 
            <div className='primary-text-btn me-1' onClick={editQuiz}>
              <MdOutlineEdit />
            </div> : <></>
          }
          <div className='primary-text-btn me-1' onClick={() => onSave(false)}>
            <MdOutlinePublish />
          </div>
          <div className='primary-text-btn me-1' onClick={() => onSave(true)}>
            <MdOutlineSave />
          </div>
          <div className='danger-text-btn' onClick={onCancel}>
            <MdOutlineCancel />
          </div>
        </div>
      </div>
    )
}

export default PagesBar;