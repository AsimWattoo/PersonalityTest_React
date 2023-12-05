import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

type QuizInfo = {
  id: number,
  name: string,
  onQuizEdit(id: number): void,
  onQuizDelete(id: number): void,
}

function QuizCard(props: QuizInfo) {

  return (
    <div style={styles.card}>
      <div style={styles.addquizcard}>
        <img src="../"/>
      </div>
      <div className='d-flex justify-content-between align-items-center w-100 mt-2'>
        <h3  style={styles.addicon}>
          {props.name}
        </h3>
        <div className="d-flex align-items-center">
          <a className='btn btn-secondary mx-2' onClick={() => props.onQuizEdit(props.id)}>
            <MdEdit />
          </a>
          <a className='btn btn-danger mx-2' onClick={() => props.onQuizDelete(props.id)}>
            <MdDelete />
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
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
