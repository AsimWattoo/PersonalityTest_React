import React from 'react';

type QuizInfo = {
  id: number,
  name: string,
  onQuizClick(id: number): void
}

function QuizCard(props: QuizInfo) {
  return (
    <div style={styles.card}>
      <div style={styles.addquizcard} onClick={() => props.onQuizClick(props.id)}>
        <img src="../"/>
      </div>
      <h3  style={styles.addicon}>
        {props.name}
      </h3>
    </div>
  );
}

export default QuizCard;

const styles = {
  card: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  addquizcard: {
    flexDirection: "column",
    textAlign: "center",
    borderRadius: "10px",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    color: "#000",
    cursor: "pointer",
    display: "flex",
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
    textAlign: "center",
    width: "100%"
  },
};
