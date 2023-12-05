"use client"; // pages/quiz.js
import React, { useState } from 'react';
import NavigationBar from "../NavigationBar.js";
import QuizCard from "../components/Quizcard.js";
import AddQuizCard from '../components/AddQuiz.js';
import { resetProperties } from '../redux/shared.js';
import { resetProperties as resetPresentationProperties } from '../redux/presentationProperties.js';
import { resetQuestions } from '../redux/question.js';
import { resetSelection } from '../redux/question.js';
import { createNewQuiz, deleteQuiz } from '../redux/quiz.js';
import { useAppDispatch, useAppSelector } from '../redux/hooks.js';
import { useNavigate } from 'react-router';


function NewQuizPage() {
  
  let quizState = useAppSelector(state => state.quiz);
  let dispatch = useAppDispatch();
  let navigate = useNavigate();

  // Function to handle adding a new quiz
  const handleAddQuiz = () => {
    dispatch(createNewQuiz({}));
  };

  const quizClicked = (id: number) => {
    let quiz = quizState.quizes.filter(quiz => quiz.id == id)[0];
    dispatch(resetProperties(quiz.sharedProperties.properties));
    dispatch(resetQuestions(quiz.questions));
    dispatch(resetSelection({}));
    dispatch(resetPresentationProperties(quiz.presentationProperties.properties));
    navigate(`/quiz/presentation/${id}`)
  }

  return (
    <div style={styles.page}>
      <NavigationBar hasEditBtn={false} hasPreview={false} hasSubmitBtn={false}/>
      <div style={styles.gridContainer}>
      <AddQuizCard onAddQuiz={handleAddQuiz} />
      {
        quizState.quizes.map((quiz, index) => {
          return (
            <QuizCard key={index} id={quiz.id} name={quiz.title} onQuizClick={quizClicked}/>
          )
        })
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '5rem',
    padding: '100px',
    width: '100%',
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
