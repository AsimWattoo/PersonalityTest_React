import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import loadData from '../helpers/dataLoader';
import Loader from '../components/Loader';
import getIcon from '../helpers/icon';
import BackgroundDisplay from '../components/BackgroundDisplay';
import { setExternalLinkClicked } from '../redux/stats';

let ThankYouPlayPage = () => {

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
        }, true);
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

    let externalLinkClicked = () => {
      dispatch(setExternalLinkClicked({}));
      location.href = thankyouProperties?.Config?.ExternalLink;
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
                        <div style={{"justifyContent": thankyouProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}} onClick={() => navigate(`/quiz/play/presentation/${params.id}`)}>
                            <a className='btn btn-primary' style={{ ...thankyouProperties.restartBtn, ...restartBtnHoverState}} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                            {thankyouProperties.ButtonHoverStyle.ReStartButtonText}
                            </a>
                        </div> : 
                        <></>
                        }
                        {
                        thankyouProperties.Config.ShowLinkButton ? 
                        <div style={{"justifyContent": thankyouProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={{...thankyouProperties.linkBtn, ...linkBtnHoverState}} onMouseEnter={onLinkMouseEnter} onMouseLeave={onLinkMouseLeave} onClick={externalLinkClicked}>
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
            </> : <></>
          )
        }
      </div>
    )
}

export default ThankYouPlayPage;