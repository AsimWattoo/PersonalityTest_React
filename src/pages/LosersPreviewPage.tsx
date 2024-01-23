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

let LoserPreviewPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let loserPageProperties = useAppSelector(state => state.loser.properties);
    let socialIcons = useAppSelector(state => state.socialIcons.icons);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [windowWidth, setWindowWidth] = useState(600);
    let [restartBtnHoverState, setRestartBtnHoverState] = useState({});
    let [linkBtnHoverState, setLinkBtnHoverState] = useState({});
    let [nextBtnHoverState, setNextBtnHoverState] = useState({});

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

    let onStartMouseEnter = () => {
      if(loserPageProperties) {
        if(loserPageProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: loserPageProperties.ButtonHoverStyle.ReStartButtonHoverColor,
            color: loserPageProperties.ButtonHoverStyle.ReStartButtonHoverTextColor
          })
        }
      }
    }

    useEffect(() => {
      if(loserPageProperties) {
        setRestartBtnHoverState({
          backgroundColor: loserPageProperties.restartBtn.backgroundColor,
          color: loserPageProperties.restartBtn.color
        });
        setLinkBtnHoverState({
          backgroundColor: loserPageProperties.linkBtn.backgroundColor,
          color: loserPageProperties.linkBtn.color
        });
        setNextBtnHoverState({
          backgroundColor: loserPageProperties.nextBtn.backgroundColor,
          color: loserPageProperties.nextBtn.color
        })
      }
    }, [loserPageProperties])
  
    useEffect(() => {
      setWindowWidth(window.innerWidth)
    })

    let onStartMouseLeave = () => {
      if(loserPageProperties) {
        if(loserPageProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: loserPageProperties.restartBtn.backgroundColor,
            color: loserPageProperties.restartBtn.color
          })
        }
      }
    }

    window.onresize = () => {
      setWindowWidth(window.innerWidth)
    }

    let onLinkMouseEnter = () => {
      if(loserPageProperties) {
        if(loserPageProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: loserPageProperties.ButtonHoverStyle.LinkButtonHoverColor,
            color: loserPageProperties.ButtonHoverStyle.LinkButtonHoverTextColor
          })
        }
      }
    }

    let onLinkMouseLeave = () => {
      if(loserPageProperties) {
        if(loserPageProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: loserPageProperties.linkBtn.backgroundColor,
            color: loserPageProperties.linkBtn.color
          })
        }
      }
    }

    let onNextMouseEnter = () => {
      if(loserPageProperties) {
        if(loserPageProperties.nextBtn.backgroundColor) {
          setNextBtnHoverState({
            backgroundColor: loserPageProperties.ButtonHoverStyle.NextButtonHoverColor,
            color: loserPageProperties.ButtonHoverStyle.NextButtonHoverTextColor
          })
        }
      }
    }

    let onNextMouseLeave = () => {
      if(loserPageProperties) {
        if(loserPageProperties.nextBtn.backgroundColor) {
          setNextBtnHoverState({
            backgroundColor: loserPageProperties.nextBtn.backgroundColor,
            color: loserPageProperties.nextBtn.color
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
            quiz && loserPageProperties ? 
            <>
            <div className='content-container'>
                <div className='quiz-view-container'>
                    <div className='header-container'>
                        <PagesBar currentPage={'losers'} quizId={id} canPreview={false} canEdit={true} canNavigate={false}/>
                    </div>
                    <div className='page-container'>
                        <div className='left-column'>
                          <div className='page-content'>
                              <BackgroundDisplay PageProperties={loserPageProperties} PropertySection='loserImage' hasMobileBackground={false} isEdit={false} mobileBackgroundSection='' className=''/>
                              <div style={loserPageProperties.heading}>
                                Looser
                              </div>
                              <div style={loserPageProperties.description}>
                                You have failed the test and have not fallen in any category. try changing your answers.
                              </div>
                              <div className='d-flex align-items-center justify-content-center mt-2 p-2'>
                                {
                                  socialIcons ? 
                                  socialIcons.map((icon, index) => {
                                    return (
                                      <a className='social-icon' key={index} href={icon.url}>
                                        {getIcon(icon.icon)()}
                                      </a>
                                    )
                                  })
                                  : <></>
                                }
                              </div>
                              <div className='d-flex align-items-center w-50'>
                              {
                                loserPageProperties.Config.ShowRestartButton ? 
                                <div style={{"justifyContent": loserPageProperties.restartBtn["justifyContent"], "width": "50%", "display": "flex"}} onClick={() => navigate(`/quiz/preview/presentation/${params.id}`)}>
                                    <a className='btn btn-primary' style={{ ...loserPageProperties.restartBtn, ...restartBtnHoverState}} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                    {loserPageProperties.ButtonHoverStyle.ReStartButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              {
                                loserPageProperties.Config.ShowLinkButton ? 
                                <div style={{"justifyContent": loserPageProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                                    <a className='btn btn-primary' style={{...loserPageProperties.linkBtn, ...linkBtnHoverState}} onMouseEnter={onLinkMouseEnter} onMouseLeave={onLinkMouseLeave} href={loserPageProperties?.Config?.ExternalLink}>
                                    {loserPageProperties.ButtonHoverStyle.LinkButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              {
                                loserPageProperties.Config.NextButton ? 
                                <div style={{"justifyContent": loserPageProperties.nextBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                                    <a className='btn btn-primary' style={{...loserPageProperties.nextBtn, ...nextBtnHoverState}} onMouseEnter={onNextMouseEnter} onMouseLeave={onNextMouseLeave} onClick={() => navigate(`/quiz/preview/registration/${id}`)}>
                                    {loserPageProperties.ButtonHoverStyle.NextButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              </div>
                              <BackgroundDisplay PageProperties={loserPageProperties} isEdit={false} PropertySection='background' hasMobileBackground={true} mobileBackgroundSection='mobileBackground' className='background'/>
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

export default LoserPreviewPage;