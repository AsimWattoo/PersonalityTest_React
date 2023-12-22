import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import { updateQuiz, setQuiz } from '../redux/quiz';
import type { Quiz, QuizUpdate } from '../redux/quiz';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';

let WinnerPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let winnerPageProperties = useAppSelector(state => state.winner.properties);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
        });
      }

    }, []);

    return (
      <div className='content-container'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && winnerPageProperties ? 
            <>
              <div className='quiz-view-container'>
                <div className='header-container'>
                  <PagesBar currentPage={'winner'} quizId={id} canPreview={true} canEdit={false}/>
                </div>
                <div className='page-container'>
                  <div className='left-column'>
                    <div className='page-content'>
                      <div style={{...winnerPageProperties.winnerImage, "transition": "all 0.2s ease-in-out"}}></div>
                      <div style={winnerPageProperties.heading}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>
                      <div style={winnerPageProperties.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non mauris lectus. Aenean accumsan molestie ante, non tincidunt arcu tempor ut. Aenean ullamcorper sapien eget consequat vulputate. Ut dapibus felis lectus, vel finibus odio lacinia vitae. Praesent faucibus, ex eu rutrum ornare, ipsum tortor consectetur neque, quis laoreet risus nunc laoreet turpis. Sed eget nulla id arcu finibus malesuada. Nunc a pulvinar nisl. Proin leo nibh, tincidunt sit amet volutpat et, faucibus quis urna.
                      </div>
                      <div className='d-flex align-items-center w-100'>
                        {
                          winnerPageProperties.Config.ShowRestartButton ? 
                          <div style={{"justifyContent": winnerPageProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                              <a className='btn btn-primary' style={winnerPageProperties.restartBtn}>
                              {winnerPageProperties.ButtonHoverStyle.ReStartButtonText}
                              </a>
                          </div> : 
                          <></>
                        }
                        {
                          winnerPageProperties.Config.ShowLinkButton ? 
                          <div style={{"justifyContent": winnerPageProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                              <a className='btn btn-primary' style={winnerPageProperties.linkBtn}>
                              {winnerPageProperties.ButtonHoverStyle.LinkButtonText}
                              </a>
                          </div> : 
                          <></>
                        }
                      </div>
                      <div className='background' style={winnerPageProperties.background}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right-column'>
                <TextCustomization title={'Background'} mainSection={"winnerPageProperties"} propertySection={'background'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Mobile Background'} mainSection={"winnerPageProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Winner Page Image'} mainSection={"winnerPageProperties"} propertySection={'winnerImage'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Heading'} mainSection={"winnerPageProperties"} propertySection={'heading'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Description'} mainSection={"winnerPageProperties"} propertySection={'description'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Quiz Button'} mainSection={"winnerPageProperties"} propertySection={'restartBtn'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Quiz Link Button'} mainSection={"winnerPageProperties"} propertySection={'linkBtn'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Buttons Hover Style'} mainSection={"winnerPageProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Configuration'} mainSection={"winnerPageProperties"} propertySection={'Config'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default WinnerPage;