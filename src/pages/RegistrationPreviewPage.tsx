import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import getIcon from '../helpers/icon';
import CheckBox from '../components/checkbox';
import { MdArrowBack } from 'react-icons/md';

let RegistrationPreviewPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let quiz = useAppSelector(state => state.quiz.quiz);
    let regQuestions = useAppSelector(state => state.registration.questions);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

    return (
      <div className='page preview-page'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz ? 
            <>
            <div className='content-container'>
                <div className='quiz-view-container'>
                    <div className='header-container'>
                        <PagesBar currentPage={'registration'} quizId={id} canPreview={false} canEdit={true} canNavigate={false}/>
                    </div>
                    <div className='page-container'>
                        <div className='left-column'>
                          <div className='page-content'>
                            <div className="registration-form-container">
                                <div className="registration-form">
                                    <div className="input-group">
                                        <label>Nimi</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="input-group">
                                        <label>Puhelinnumero</label>
                                        <input type="text" className="form-control"/>
                                    </div>
                                    <div className="input-group">
                                        <label>Sähköposti</label>
                                        <input type="email" className="form-control"/>
                                    </div>
                                    {
                                        regQuestions?.map((question, index) => {
                                            return (
                                            <div className="input-group editable" key={index}>
                                                <label>{question.text}</label>
                                                <input type="text" className="form-control" placeholder="Enter Answer"/>
                                            </div>
                                            )
                                        })
                                    }
                                    <div className="input-group horizontal">
                                        <CheckBox />
                                        <label>Olen lukenut säännöt ja hyväksyn ne.</label>
                                    </div>
                                    <div className="btn-container">
                                        <div className="primary-btn">
                                          Osallistu
                                        </div>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default RegistrationPreviewPage;