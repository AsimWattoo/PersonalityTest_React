import React from 'react';
import { useNavigate } from 'react-router';

let PagesBar = ({currentPage, quizId}) => {

    let navigate = useNavigate();

    let onPresentationPageClick = () => {
        navigate(`/quiz/presentation/${quizId}`)
    }

    let onQuestionsPageClick = () => {
        navigate(`/quiz/questions/${quizId}`)
    }

    return (
        <div className="pages-bar">
          <div className={`page-btn ${currentPage == "presentation" ? 'active' : ''}`}
            onClick={onPresentationPageClick}>
                Presentation Page
            </div>
          <div className={`page-btn ${currentPage == 'questions' ? 'active' : ''}`} onClick={onQuestionsPageClick}>
            Questions Page
            </div>
          <div className="page-btn">Winners Page</div>
          <div className="page-btn">Loosers Page</div>
        </div>
    )
}

export default PagesBar;