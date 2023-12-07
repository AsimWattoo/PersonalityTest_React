"use client"; // pages/quiz.js
import React, { useEffect, useState } from 'react';
import NavigationBar from "../NavigationBar.js";
import QuizCard from "../components/Quizcard.js";
import AddQuizCard from '../components/AddQuiz.js';
import { useNavigate } from 'react-router';
import { sendRequest } from '../helpers/request.js';
import Urls from '../links.js';
import { useAppDispatch } from '../redux/hooks.js';
import { setQuiz, resetQuiz } from '../redux/quiz.js';
import { initializeProperties, resetProperties } from '../redux/presentationProperties.js';
import { initializeProperties as initializeSharedProperties, resetProperties as resetSharedProperties } from '../redux/shared.js';
import { resetQuestions, setQuestions } from '../redux/question.js';
import type { Quiz } from '../redux/quiz.js';

function NewQuizPage() {
  
  let dispatch = useAppDispatch();
  let navigate = useNavigate();
  let [quizes, setQuizes] = useState([]);

  let loadQuizes = async () => {
    dispatch(resetQuestions({}))
    dispatch(resetQuiz({}));
    dispatch(resetProperties({}));
    dispatch(resetSharedProperties({}));
    let response = await sendRequest(Urls.getAllQuizes.url(), Urls.getAllQuizes.type);
    if(!response.error) {
      setQuizes(response.quizes.map(quiz => {
        quiz.presentationProperties = JSON.parse(quiz.presentationProperties);
        return quiz;
      }));
    } else {
      console.log(response.error);
    }
  }

  useEffect(() => {
    loadQuizes();
  }, []);

  // Function to handle adding a new quiz
  const handleAddQuiz = async () => {
    let response = await sendRequest(Urls.createQuiz.url(), Urls.createQuiz.type, {title: "Enter Quiz Name", description: ""});
    if(response.error){
      console.log(response.error)
    } else {
      response.quiz.presentationProperties = JSON.parse(response.quiz.presentationProperties);
      response.quiz.sharedProperties = JSON.parse(response.quiz.sharedProperties);
      let quiz = response.quiz;
      dispatch(setQuiz({
        id: quiz._id,
        description: quiz.description,
        title: quiz.title,
        presentationProperties: quiz.presentationProperties,
        sharedProperties: quiz.sharedProperties,
        isDraft: quiz.isDraft
      } as Quiz))
      dispatch(initializeProperties(quiz.presentationProperties.properties))
      dispatch(initializeSharedProperties(quiz.sharedProperties.properties))
      navigate(`/quiz/presentation/${quiz._id}`)
    }
  };

  const quizPlay = (id: string) => {
    navigate(`/quiz/play/presentation/${id}`)
  }

  const quizEdit = async (id: string) => {
    dispatch(resetQuestions({}))
    let response = await sendRequest(Urls.getQuiz.url(id), Urls.getQuiz.type);
    if(response.error) {
      console.log(response.error);
    }
    else {
      response.quiz.presentationProperties = JSON.parse(response.quiz.presentationProperties);
      response.quiz.sharedProperties = JSON.parse(response.quiz.sharedProperties);
      let quiz = response.quiz;
      dispatch(setQuiz({
        id: quiz._id,
        description: quiz.description,
        title: quiz.title,
        presentationProperties: quiz.presentationProperties,
        sharedProperties: quiz.sharedProperties,
        isDraft: quiz.isDraft
      } as Quiz))

      dispatch(initializeProperties(quiz.presentationProperties.properties))
      dispatch(initializeSharedProperties(quiz.sharedProperties.properties))
    }

    //Loading Questions
    let questionResponse = await sendRequest(Urls.getQuestions.url(id), Urls.getQuestions.type);
    if(questionResponse.error) {
      console.log(questionResponse.error);
    }
    else {
      questionResponse.questions = questionResponse.questions.map(question => {
        question.properties = JSON.parse(question.properties);
        return question;
      })
      dispatch(setQuestions(questionResponse.questions))
    }
    navigate(`/quiz/presentation/${id}`)
  }

  const quizDelete = async (id: string) => {
    let response = await sendRequest(Urls.deleteQuiz.url(id), Urls.deleteQuiz.type);
    if(response.error) {
      console.log(response.error);
    } else {
      await loadQuizes();
    }
  }

  return (
    <div style={styles.page}>
      <NavigationBar hasEditBtn={false} hasPreview={false} hasSubmitBtn={false} hasCancelBtn={false}/>
      <div style={styles.gridContainer}>
        <AddQuizCard onAddQuiz={handleAddQuiz} />
        {
          quizes.length > 0 ? 
            quizes.map((quiz, index) => {
              return (
                <QuizCard key={index} id={quiz._id} name={quiz.title}
                  isDraft={quiz.isDraft}
                  imageProperties={quiz.presentationProperties.properties.presentationImage} 
                  onQuizEdit={quizEdit} 
                  onQuizDelete={quizDelete}
                  onQuizPlay={quizPlay}/>
              )
            }) : 
            <div></div>
        }
      </div>
    </div>
  );
}

// Styles for the components
const styles = {
  page: {
    fontFamily: 'Montserrat, sans-serif',
    display: 'flex',
    alignItems: 'center',
    width: "100%",
    backgroundColor: '#f0f0f0',
    height: '100vh',
    overflow: 'hidden',
    flexDirection: "column"
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '5rem',
    padding: '100px',
    width: '100%',
    "height": "100%",
    "overflowX": "hidden",
    "overflowY": "auto",
  },
  addNewCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #ccc',
    borderRadius: '8px',
    height: '150px',
    cursor: 'pointer',
    color:'#000'

  },
  plusIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
    color:'#000'
  },
  // ...other styles
};

export default NewQuizPage;
