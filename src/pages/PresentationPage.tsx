import React, { useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar';
import PagesBar from '../components/PagesBar';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/presentationProperties';
import { initializeProperties as initializeSharedProperties, resetProperties as resetSharedProperties } from '../redux/shared.js';
import { updateQuiz, setQuiz } from '../redux/quiz';
import type { Quiz, QuizUpdate } from '../redux/quiz';
import { sendRequest } from '../helpers/request';
import { setQuestions } from '../redux/question';
import Urls from '../links';
import loadData from '../helpers/dataLoader';

let PresentationPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let quizProperties = useAppSelector(state => state.presentation.properties);
    let quiz = useAppSelector(state => state.quiz.quiz);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        loadData(id, dispatch);
      }

    }, []);

    let headingUpdated = (value: string) => {
      let quizUpdate: QuizUpdate = {
        title: value,
        description: quiz.description
      }

      dispatch(updateQuiz(quizUpdate))
    }

    let descriptionUpdated = (value: string) => {
      let quizUpdate: QuizUpdate = {
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
        {
          quiz && quizProperties ? 
          <>
            <div className='left-column'>
              <div className='page-content' style={quizProperties.background}>
                <div style={{...quizProperties.presentationImage, "transition": "all 0.2s ease-in-out"}}></div>
                <input type="text" style={quizProperties.heading} value={quiz.title} onChange={e => headingUpdated(e.target.value)}/>
                <input type="description" style={quizProperties.description} value={quiz.description} onChange={e => descriptionUpdated(e.target.value)}/>
                <div style={{"justifyContent": quizProperties.startBtn["justifyContent"], "width": "50%", "display": "flex"}}>
                  <a className='btn btn-primary' style={quizProperties.startBtn}>
                    {quizProperties.ButtonHoverStyle.StartButtonText}
                  </a>
                </div>
              </div>
            </div>
            <div className='right-column'>
              <TextCustomization title={'Presentation Background'} mainSection={"presentationProperties"} propertySection={'background'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Presentation Mobile Background'} mainSection={"presentationProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Presentation Image'} mainSection={"presentationProperties"} propertySection={'presentationImage'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Quiz Heading'} mainSection={"presentationProperties"} propertySection={'heading'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Quiz Description'} mainSection={"presentationProperties"} propertySection={'description'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Start Quiz Button'} mainSection={"presentationProperties"} propertySection={'startBtn'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              <TextCustomization title={'Start Button Hover Style'} mainSection={"presentationProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={quizProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
            </div>
          </> : <></>
        }
      </div>
    </div>
    )
}

export default PresentationPage;