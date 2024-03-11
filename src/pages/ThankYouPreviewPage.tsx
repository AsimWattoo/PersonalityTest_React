import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import getIcon from '../helpers/icon';
import BackgroundDisplay from '../components/BackgroundDisplay';

let ThankYouPreviewPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let thankyouProperties = useAppSelector(state => state.thankYou.properties);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [restartBtnHoverState, setRestartBtnHoverState] = useState({});
    let [linkBtnHoverState, setLinkBtnHoverState] = useState({});

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

    let onStartMouseEnter = () => {
      if(thankyouProperties) {
        if(thankyouProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: thankyouProperties.ButtonHoverStyle.ReStartButtonHoverColor,
            color: thankyouProperties.ButtonHoverStyle.ReStartButtonHoverTextColor
          })
        }
      }
    }

    useEffect(() => {
      if(thankyouProperties) {
        setRestartBtnHoverState({
          backgroundColor: thankyouProperties.restartBtn.backgroundColor,
          color: thankyouProperties.restartBtn.color
        });
        setLinkBtnHoverState({
          backgroundColor: thankyouProperties.linkBtn.backgroundColor,
          color: thankyouProperties.linkBtn.color
        });
      }
    }, [thankyouProperties])

    let onStartMouseLeave = () => {
      if(thankyouProperties) {
        if(thankyouProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: thankyouProperties.restartBtn.backgroundColor,
            color: thankyouProperties.restartBtn.color
          })
        }
      }
    }

    let onLinkMouseEnter = () => {
      if(thankyouProperties) {
        if(thankyouProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: thankyouProperties.ButtonHoverStyle.LinkButtonHoverColor,
            color: thankyouProperties.ButtonHoverStyle.LinkButtonHoverTextColor
          })
        }
      }
    }

    let onLinkMouseLeave = () => {
      if(thankyouProperties) {
        if(thankyouProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: thankyouProperties.linkBtn.backgroundColor,
            color: thankyouProperties.linkBtn.color
          })
        }
      }
    }

    return (
      <div className='page preview-page'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && thankyouProperties ? 
            <>
            <div className='content-container'>
                <div className='quiz-view-container'>
                    <div className='header-container'>
                        <PagesBar currentPage={'thankyou'} quizId={id} canPreview={false} canEdit={true} canNavigate={false}/>
                    </div>
                    <div className='page-container'>
                        <div className='left-column'>
                          <div className='page-content'>
                              <BackgroundDisplay PageProperties={thankyouProperties} PropertySection='thankyouImage' hasMobileBackground={false} isEdit={false} mobileBackgroundSection='' className=''/>
                              <div style={thankyouProperties.heading}>
                                {thankyouProperties.headingText}
                              </div>
                              <div style={thankyouProperties.description}>
                                {thankyouProperties.descriptionText}
                              </div>
                              <div className='d-flex align-items-center w-50'>
                              {
                                thankyouProperties.Config.ShowRestartButton ? 
                                <div style={{"justifyContent": thankyouProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}} onClick={() => navigate(`/quiz/preview/presentation/${params.id}`)}>
                                    <a className='btn btn-primary' style={{ ...thankyouProperties.restartBtn, ...restartBtnHoverState}} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                    {thankyouProperties.ButtonHoverStyle.ReStartButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              {
                                thankyouProperties.Config.ShowLinkButton ? 
                                <div style={{"justifyContent": thankyouProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                                    <a className='btn btn-primary' style={{...thankyouProperties.linkBtn, ...linkBtnHoverState}} onMouseEnter={onLinkMouseEnter} onMouseLeave={onLinkMouseLeave} href={thankyouProperties?.Config?.ExternalLink}>
                                    {thankyouProperties.ButtonHoverStyle.LinkButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              </div>
                              <BackgroundDisplay PageProperties={thankyouProperties} isEdit={false} PropertySection='background' hasMobileBackground={true} mobileBackgroundSection='mobileBackground' className='background'/>
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

export default ThankYouPreviewPage;