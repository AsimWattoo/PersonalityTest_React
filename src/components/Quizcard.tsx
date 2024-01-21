import React from 'react';
import "./component.css";
import '../App.css'
import { MdDelete, MdEdit, MdEditSquare, MdLink, MdMenu } from 'react-icons/md';
import { useLocation } from 'react-router';
import { showNotification } from '../redux/notification';
import { useAppDispatch } from '../redux/hooks';

type QuizInfo = {
  id: string,
  name: string,
  isDraft: boolean,
  description: string,
  imageProperties: {},
  showResults: boolean,
  onQuizEdit(id: string): void,
  onQuizDelete(id: string): void,
  onQuizPlay(id: string): void,
  onQuizResult(id: string): void
}

function QuizCard(props: QuizInfo) {

  let dispatch = useAppDispatch();
  const playQuiz = () => {
    if(!props.isDraft) {
      props.onQuizPlay(props.id)
    }
  }

  return (
    <div className='quiz-card' onClick={playQuiz}>
      <div style={{...props.imageProperties}} className='quiz-image'>
      </div>
      <div className='content'>
        <div className='info'>
          <div className='content-header'>
            <h3  className='title'>
              {props.name}
            </h3>
            <div className={`status-circle ${props.isDraft ? 'status-red' : 'status-green'}`}>
            </div>
          </div>
          <div className='description'>
            {props.description}
          </div>
        </div>
        <div className="btn-container">
          {
            props.showResults ? 
            <div className='primary-btn me-2' onClick={() => props.onQuizResult(props.id)}>
              <MdMenu />
              Results
            </div>  :
            <>
              {
                props.isDraft ? 
                <div className='primary-btn me-2' onClick={() => props.onQuizEdit(props.id)}>
                  <MdEdit />
                  Edit
                </div> : 
                <div className='primary-btn me-2' onClick={(e) =>{
                  e.stopPropagation();
                  navigator.clipboard.writeText(`${window.location.origin}/quiz/play/presentation/${props.id}`);
                  dispatch(showNotification({
                    isError: false,
                    message: "Test Link has been copied to the clipboard"
                  }))
                }}>
                  <MdLink />
                  Copy Link
                </div>
              }
              <a className='danger-outline-btn' onClick={(e) => {
                e.stopPropagation();
                props.onQuizDelete(props.id)
              }}>
                <MdDelete />
                Delete
              </a>
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
