import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/loserProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';

let LosersPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let loserPageProperties = useAppSelector(state => state.loser.properties);
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
            quiz && loserPageProperties ? 
            <>
              <div className='quiz-view-container'>
                <div className='header-container'>
                  <PagesBar currentPage={'losers'} quizId={id} canPreview={true} canEdit={false}/>
                </div>
                <div className='page-container'>
                  <div className='left-column'>
                    <div className='page-content'>
                      <div style={{...loserPageProperties.loserImage, "transition": "all 0.2s ease-in-out"}}></div>
                      <div style={loserPageProperties.heading}>
                        Looser
                      </div>
                      <div style={loserPageProperties.description}>
                        You have failed the test and have not fallen in any category. try changing your answers.
                      </div>
                      {
                        loserPageProperties.Config.ShowRestartButton ? 
                        <div style={{"justifyContent": loserPageProperties.restartBtn["justifyContent"], "width": "50%", "display": "flex"}}>
                            <a className='btn btn-primary' style={loserPageProperties.restartBtn}>
                            {loserPageProperties.ButtonHoverStyle.ReStartButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      <div className='background' style={loserPageProperties.background}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right-column'>
                <TextCustomization title={'Background'} mainSection={"loserPageProperties"} propertySection={'background'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Mobile Background'} mainSection={"loserPageProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Loser Page Image'} mainSection={"loserPageProperties"} propertySection={'loserImage'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={' Heading'} mainSection={"loserPageProperties"} propertySection={'heading'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Description'} mainSection={"loserPageProperties"} propertySection={'description'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Quiz Button'} mainSection={"loserPageProperties"} propertySection={'restartBtn'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Button Hover Style'} mainSection={"loserPageProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Configuration'} mainSection={"loserPageProperties"} propertySection={'Config'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default LosersPage;