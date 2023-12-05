import React from 'react';
import NavigationBar from '../NavigationBar';
import PagesBar from '../components/PagesBar';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty } from '../redux/presentationProperties';
import { updateQuiz } from '../redux/quiz';
import type { QuizUpdate } from '../redux/quiz';

let PresentationPage = () => {

    let params = useParams();
    let id = parseInt(params.id);
    let quizProperties = useAppSelector(state => state.presentation.properties);
    let quiz = useAppSelector(state => state.quiz.quizes.filter(quiz => quiz.id == id)[0])
    let dispatch = useAppDispatch();

    let headingUpdated = (value) => {
      let quizUpdate: QuizUpdate = {
        quizId: quiz.id,
        title: value,
        description: quiz.description
      }

      dispatch(updateQuiz(quizUpdate))
    }

    let descriptionUpdated = (value) => {
      let quizUpdate: QuizUpdate = {
        quizId: quiz.id,
        title: quiz.title,
        description: value
      }

      dispatch(updateQuiz(quizUpdate))
    }

    return (
    <div className="page">
      <NavigationBar hasSubmitBtn={true} hasPreview={true} hasEditBtn={false} hasCancelBtn={true}/>
      <div className='content-container'>
        <PagesBar currentPage={'presentation'} quizId={params.id}/>
        <div className='left-column'>
          <div className='page-content' style={quizProperties.background}>
            <input type="text" style={quizProperties.heading} value={quiz.newTitle} onChange={e => headingUpdated(e.target.value)}/>
            <input type="description" style={quizProperties.description} value={quiz.newDescription} onChange={e => descriptionUpdated(e.target.value)}/>
            <div style={{"justifyContent": quizProperties.startBtn["justifyContent"], "width": "50%", "display": "flex"}}>
              <a className='btn btn-primary' style={quizProperties.startBtn}>
                {quizProperties.ButtonHoverStyle.StartButtonText}
              </a>
            </div>
          </div>
        </div>
        <div className='right-column'>
          <TextCustomization title={'Presentation Background'} propertySection={'background'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
          <TextCustomization title={'Quiz Heading'} propertySection={'heading'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
          <TextCustomization title={'Quiz Description'} propertySection={'description'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
          <TextCustomization title={'Start Quiz Button'} propertySection={'startBtn'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
          <TextCustomization title={'Start Button Hover Style'} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
        </div>
      </div>
    </div>
    )
}

export default PresentationPage;