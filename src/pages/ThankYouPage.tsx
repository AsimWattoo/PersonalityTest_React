import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/thankyouProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import { updateHeading, updateDescription } from '../redux/thankyouProperties';
import BackgroundDisplay from '../components/BackgroundDisplay';


let ThankYouPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let thankyouProperties = useAppSelector(state => state.thankYou.properties);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }
    }, []);

    let onChangeHeading = (val: string) => {
      dispatch(updateHeading(val));
    }

    let onChangeDescription = (val: string) => {
      dispatch(updateDescription(val));
    }

    return (
      <div className='content-container'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && thankyouProperties ? 
            <>
              <div className='quiz-view-container'>
                <div className='header-container'>
                  <PagesBar currentPage={'thankyou'} quizId={id} canPreview={true} canEdit={false}/>
                </div>
                <div className='page-container'>
                  <div className='left-column'>
                    <div className='page-content'>
                      <BackgroundDisplay PageProperties={thankyouProperties} PropertySection='thankyouImage' hasMobileBackground={false} isEdit={true} mobileBackgroundSection='' className=''/>
                      <textarea style={thankyouProperties.heading} name='headingText' placeholder='Thank You Page Heading' onChange={e => onChangeHeading(e.currentTarget.value)}>
                        {thankyouProperties.headingText}
                      </textarea>
                      <textarea style={thankyouProperties.description} placeholder='Thank You Page Description' onChange={e => onChangeDescription(e.currentTarget.value)}>
                        {thankyouProperties.descriptionText}
                      </textarea>
                      <div className='d-flex align-items-center w-100'>
                      {
                        thankyouProperties.Config.ShowRestartButton ? 
                        <div style={{"justifyContent": thankyouProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={thankyouProperties.restartBtn}>
                            {thankyouProperties.ButtonHoverStyle.ReStartButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      {
                        thankyouProperties.Config.ShowLinkButton ? 
                        <div style={{"justifyContent": thankyouProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={thankyouProperties.linkBtn}>
                            {thankyouProperties.ButtonHoverStyle.LinkButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      </div>
                      <BackgroundDisplay PageProperties={thankyouProperties} isEdit={true} PropertySection='background' hasMobileBackground={false} mobileBackgroundSection=''  className='background'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right-column'>
                <TextCustomization title={'Background'} mainSection={"thankyouProperties"} propertySection={'background'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Mobile Background'} mainSection={"thankyouProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Thank Page Image'} mainSection={"thankyouProperties"} propertySection={'thankyouImage'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Heading'} mainSection={"thankyouProperties"} propertySection={'heading'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Description'} mainSection={"thankyouProperties"} propertySection={'description'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Quiz Button'} mainSection={"thankyouProperties"} propertySection={'restartBtn'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Quiz Link Button'} mainSection={"thankyouProperties"} propertySection={'linkBtn'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Buttons Hover Style'} mainSection={"thankyouProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Configuration'} mainSection={"thankyouProperties"} propertySection={'Config'} isShared={true} sharedProperties={thankyouProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default ThankYouPage;