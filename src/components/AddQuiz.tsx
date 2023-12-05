import React from 'react';

type AddQuizType = {
  onAddQuiz(): void
}

function AddQuizCard(props: AddQuizType) {
  return (
    <div style={styles.card} onClick={props.onAddQuiz}>
      <div style={styles.addquizcard}>
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
