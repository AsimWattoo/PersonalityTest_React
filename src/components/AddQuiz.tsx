import { Link, useNavigate } from "react-router-dom";
import React from 'react';
import {useAppDispatch} from '../redux/hooks';
import {resetQuestions, resetSelection} from '../redux/question';
import { initializeProperties, resetProperties } from "../redux/shared";
import { createDefaultStyle, createButtonStyle, createOptionStyle } from "../redux/shared";

function AddQuizCard({ onAddQuiz }) {

  let navigate = useNavigate();
  let dispatch = useAppDispatch();

  let createNewQuiz = () => {
    dispatch(resetQuestions({}))
    dispatch(resetSelection({}))
    dispatch(resetProperties({}));
    navigate("/quiz");
  }

  return (
    <div style={styles.card} onClick={createNewQuiz}>
      <div style={styles.addquizcard} onClick={onAddQuiz}>
        <span style={styles.addicon}>+</span>
      </div>
      <button style={styles.addBtn}>
        Create a new Quiz
      </button>
    </div>
  );
}

export default AddQuizCard;

const styles = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textDecoration: "none"
  },
  addquizcard: {
    borderRadius: "10px",
    border: "2px dashed #000",
    padding: "1rem",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#000",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "250px",
    width: "250px",
  },
  addicon: {
    fontSize: " 1.2rem",
    marginTop: "20px",
    color: "#000",
    marginBottom: "0.5rem",
  },
  addBtn: {
    fontSize: " 1.2rem",
    marginTop: "20px",
    color: "#000",
    marginBottom: "0.5rem",
    border: 0,
    textDecoration: "none",
    fontStyle: "normal"
  },
};
