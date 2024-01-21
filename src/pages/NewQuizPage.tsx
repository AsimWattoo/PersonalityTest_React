"use client"; // pages/quiz.js
import "./QuizPage.css";
import React, { isValidElement, useEffect, useState, useSyncExternalStore } from 'react';
import QuizCard from "../components/Quizcard.js";
import { useNavigate } from 'react-router';
import { sendRequest } from '../helpers/request.js';
import Urls from '../links.js';
import { useAppDispatch } from '../redux/hooks.js';
import { resetQuiz } from '../redux/quiz.js';
import { resetProperties } from '../redux/presentationProperties.js';
import { resetProperties as resetSharedProperties } from '../redux/shared.js';
import { resetQuestions} from '../redux/question.js';
import { resetFiles } from '../redux/files.js';
import { MdAdd } from "react-icons/md";
import NoResultImage from "../assets/images/no-result.png";
import Loader from "../components/Loader";
import ConfirmationModal from "../components/Modals/ConfirmationModal";
import { showNotification } from "../redux/notification";
import { resetQuestions as resetRegistrationQuestions } from "../redux/registration";

function NewQuizPage() {
  
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  let [quizes, setQuizes] = useState([]);
  let [showDrafts, setShowDrafts] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let [quizToDelete, setQuiztoDelete] = useState("");
  let [isConfirmationShown, setIsConfirmationShown] = useState(false);

  let loadQuizes = async () => {
    setIsLoading(true);
    dispatch(resetQuestions({}))
    dispatch(resetQuiz({}));
    dispatch(resetProperties({}));
    dispatch(resetSharedProperties({}));
    dispatch(resetFiles({}));
    dispatch(resetRegistrationQuestions({}));
    let response = await sendRequest(Urls.getAllQuizes.url(), Urls.getAllQuizes.type);
    if(!response.error) {
      setQuizes(response.quizes
        .filter(quiz => showDrafts ? quiz.isDraft : !quiz.isDraft)
        .map(quiz => {
        quiz.presentationProperties = JSON.parse(quiz.presentationProperties);
        return quiz;
      }));
    } else {
      console.log(response.error);
    }
    setIsLoading(false);
  }

  let loadFonts = async () => {
    let response = await sendRequest(Urls.getFonts.url(), Urls.getFonts.type);
    if(response.error) {

    }
    else {
      var sheet = window.document.styleSheets[1];
      for(let font of response.files) {
        sheet.insertRule(`@font-face {font-family: '${font.name}';src:url('${font.url}');}`, sheet.cssRules.length);
      }
    }
  }

  useEffect(() => {
    loadFonts();
  }, []);

  useEffect(() => {
    loadQuizes();
  }, [showDrafts]);

  // Function to handle adding a new quiz
  const handleAddQuiz = async () => {
    let response = await sendRequest(Urls.createQuiz.url(), Urls.createQuiz.type, {title: "Enter Quiz Name", description: ""});
    if(response.error){
      console.log(response.error)
    } else {
      let quiz = response.quiz;
      navigate(`/quiz/presentation/${quiz._id}`)
    }
  };

  const quizPlay = (id: string) => {
    navigate(`/quiz/play/presentation/${id}`)
  }

  const quizEdit = async (id: string) => {
    dispatch(resetQuestions({}))
    navigate(`/quiz/presentation/${id}`)
  }

  const quizDelete = (id: string) => {
    setQuiztoDelete(id);
    setIsConfirmationShown(true);
  }

  let onClose = () => {
    setIsConfirmationShown(false);
    setQuiztoDelete("");
  }

  let onDeleteConfirm = async () => {
    let response = await sendRequest(Urls.deleteQuiz.url(quizToDelete), Urls.deleteQuiz.type);
    onClose();
    if(response.error) {
      dispatch(showNotification({
        message: response.error,
        isError: true,
      }));
    } else {
      await loadQuizes();
    }
  }

  let changeTab = (tab: boolean) => {
    setShowDrafts(tab);
  }

  return (
    <>
      {
        isConfirmationShown ? 
        <ConfirmationModal title={'Delete Quiz Confirmation'} message={'Are you sure you want to delete this quiz?'} onClose={onClose} onConfirm={onDeleteConfirm}/> : <></>
      }
      <div className="quiz-view-container">
        <div className="header-container">
          <div className="header">
            <div className="tabs">
              <div className={`tab ${showDrafts ? "" : "active"}`} onClick={() => changeTab(false)}>
                Published Tests
              </div>
              <div className={`tab ${showDrafts ? "active" : ""}`} onClick={() => changeTab(true)}>
                Draft Test
              </div>
              <div className={`tab`} onClick={() => navigate("/results")}>
                Results
              </div>
            </div>
            <div className="primary-btn" onClick={handleAddQuiz}>
              <MdAdd />
              Create New Test
            </div>
          </div>
        </div>
        <div className="container">
          {
            isLoading ? 
            <Loader /> : 
            <div className={`${quizes.length > 0 ? "gridContainer" : ""}`}>
            {
              quizes.length > 0 ? 
                quizes.map((quiz, index) => {
                  return (
                    <QuizCard key={index} id={quiz._id} name={quiz.title}
                      isDraft={quiz.isDraft}
                      description={quiz.description}
                      imageProperties={quiz.presentationProperties.properties.presentationImage} 
                      onQuizEdit={quizEdit} 
                      onQuizDelete={quizDelete}
                      onQuizPlay={quizPlay}/>
                  )
                }) : 
                <div className="empty-message">
                  <img src={NoResultImage}/>
                  <p>No Test Found. Please use the <strong>Create New Button</strong> to add a new test</p>
                </div>
            }
          </div>
          }
        </div>
      </div>
    </>
  );
}

export default NewQuizPage;
