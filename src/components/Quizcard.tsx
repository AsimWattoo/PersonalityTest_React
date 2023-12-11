import React from 'react';
import "./component.css";
import '../App.css'
import { MdDelete, MdEdit } from 'react-icons/md';

type QuizInfo = {
  id: string,
  name: string,
  isDraft: boolean
  imageProperties: {}
  onQuizEdit(id: string): void,
  onQuizDelete(id: string): void,
  onQuizPlay(id: string): void
}

function QuizCard(props: QuizInfo) {
  return (
    <div className='quiz-card'>
      <div style={{...props.imageProperties}} className='quiz-image' onClick={() => props.onQuizPlay(props.id)}>
      </div>
      <div className='content'>
        <div className='content-header'>
          <h3  className='title'>
            {props.name}
          </h3>
          <div className='status status-red'>
            Draft
          </div>
        </div>
        <div className="btn-container">
          <a className='secondary-outline-btn me-2' onClick={() => props.onQuizEdit(props.id)}>
            Edit
          </a>
          <a className='danger-outline-btn' onClick={() => props.onQuizDelete(props.id)}>
            Delete
          </a>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
