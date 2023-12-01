"use client"; // pages/quiz.js
import React, { useState } from 'react';
import NavigationBar from "../NavigationBar.js";
import QuizCard from "../components/Quizcard.js";
import AddQuizCard from '../components/AddQuiz.js';


function NewQuizPage() {
  const [quizzes, setQuizzes] = useState([
    // Populate this array with your existing quiz data or leave it empty initially
  ]);

  // Function to handle adding a new quiz
  const handleAddQuiz = () => {
    // Add logic to handle creating a new quiz here
    // For example, adding a new quiz object to the quizzes state array
    const newQuiz = {
      id: quizzes.length + 1,
      title: 'New Quiz',
      backgroundColor: '#E8F5E9', // Default color or generated dynamically
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  return (
    <div style={styles.page}>
      <NavigationBar />
      <div style={styles.gridContainer}>
      <AddQuizCard onAddQuiz={handleAddQuiz} />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
        <QuizCard />
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
