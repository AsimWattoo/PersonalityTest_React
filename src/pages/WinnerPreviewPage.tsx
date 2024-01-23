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

let WinnerPreviewPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let winnerPageProperties = useAppSelector(state => state.winner.properties);
    let questions = useAppSelector(state => state.question.questions);
    let personalities = useAppSelector(state => state.personality.personalities);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [personality, setPersonality] = useState({});
    let [restartBtnHoverState, setRestartBtnHoverState] = useState({});
    let [linkBtnHoverState, setLinkBtnHoverState] = useState({});
    let [nextBtnHoverState, setNextBtnHoverState] = useState({});
    let socialIcons = useAppSelector(state => state.socialIcons.icons);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

    useEffect(() => {
      if(winnerPageProperties) {
        setRestartBtnHoverState({
          backgroundColor: winnerPageProperties.restartBtn.backgroundColor,
          color: winnerPageProperties.restartBtn.color
        });
        setLinkBtnHoverState({
          backgroundColor: winnerPageProperties.linkBtn.backgroundColor,
          color: winnerPageProperties.linkBtn.color
        });
        setNextBtnHoverState({
          backgroundColor: winnerPageProperties.nextBtn.backgroundColor,
          color: winnerPageProperties.nextBtn.color
        })
      }
    }, [winnerPageProperties])
  
    let onStartMouseEnter = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: winnerPageProperties.ButtonHoverStyle.ReStartButtonHoverColor,
            color: winnerPageProperties.ButtonHoverStyle.ReStartButtonHoverTextColor
          })
        }
      }
    }

    let onStartMouseLeave = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: winnerPageProperties.restartBtn.backgroundColor,
            color: winnerPageProperties.restartBtn.color
          })
        }
      }
    }

    let onLinkMouseEnter = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: winnerPageProperties.ButtonHoverStyle.LinkButtonHoverColor,
            color: winnerPageProperties.ButtonHoverStyle.LinkButtonHoverTextColor
          })
        }
      }
    }

    let onLinkMouseLeave = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.linkBtn.backgroundColor) {
          setLinkBtnHoverState({
            backgroundColor: winnerPageProperties.linkBtn.backgroundColor,
            color: winnerPageProperties.linkBtn.color
          })
        }
      }
    }

    let onNextMouseEnter = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.nextBtn.backgroundColor) {
          setNextBtnHoverState({
            backgroundColor: winnerPageProperties.ButtonHoverStyle.NextButtonHoverColor,
            color: winnerPageProperties.ButtonHoverStyle.NextButtonHoverTextColor
          })
        }
      }
    }

    let onNextMouseLeave = () => {
      if(winnerPageProperties) {
        if(winnerPageProperties.nextBtn.backgroundColor) {
          setNextBtnHoverState({
            backgroundColor: winnerPageProperties.nextBtn.backgroundColor,
            color: winnerPageProperties.nextBtn.color
          })
        }
      }
    }

    useEffect(() => {
        if(questions.length > 0) {
            let selectedOptions = questions.map(question => question.options.filter(option => option.selected)[0]);
            let personalityDict = {}
            for(let i = 0; i < selectedOptions.length; i += 1) {
                let option = selectedOptions[i];
                if(option) {
                    if(personalityDict[option.personalityId] === undefined)
                        personalityDict[option.personalityId] = parseFloat(option.value);
                    else 
                        personalityDict[option.personalityId] += parseFloat(option.value);
                }
            }
            let scores = Object.values(personalityDict);
            let maxScore = Math.max(...scores);

            //If the user has only selected options which were not weighted
            if(maxScore == 0) {
              navigate(`/quiz/preview/loser/${id}`);
            }

            let maxScoreIndex = scores.indexOf(maxScore);
            let maxScoredPersonality = Object.keys(personalityDict)[maxScoreIndex];
            let userPersonality = personalities.filter(p => p._id == maxScoredPersonality);
            if(userPersonality.length > 0) {
                setPersonality(userPersonality[0]);
            }
        }
    }, [questions])

    return (
      <div className='page preview-page'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && winnerPageProperties ? 
            <>
            <div className='content-container'>
                <div className='quiz-view-container'>
                    <div className='header-container'>
                        <PagesBar currentPage={'winner'} quizId={id} canPreview={false} canEdit={true} canNavigate={false}/>
                    </div>
                    <div className='page-container'>
                        <div className='left-column'>
                          <div className='page-content'>
                              <div style={{...winnerPageProperties.winnerImage, "transition": "all 0.2s ease-in-out"}}></div>
                              <div style={winnerPageProperties.heading}>
                              {
                                  personality ? 
                                  personality.name : "Personality Name"
                              }
                              </div>
                              <div style={winnerPageProperties.description}>
                              {
                                  personality ? 
                                  personality.description : "Personality Description"
                              }
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
                                winnerPageProperties.Config.ShowRestartButton ? 
                                <div style={{"justifyContent": winnerPageProperties.restartBtn["justifyContent"], "width": "50%", "display": "flex"}} onClick={() => navigate(`/quiz/preview/presentation/${params.id}`)}>
                                    <a className='btn btn-primary' style={{ ...winnerPageProperties.restartBtn, ...restartBtnHoverState}} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                    {winnerPageProperties.ButtonHoverStyle.ReStartButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              {
                                winnerPageProperties.Config.ShowLinkButton ? 
                                <div style={{"justifyContent": winnerPageProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                                    <a className='btn btn-primary' style={{...winnerPageProperties.linkBtn, ...linkBtnHoverState}} onMouseEnter={onLinkMouseEnter} onMouseLeave={onLinkMouseLeave} href={winnerPageProperties?.Config?.ExternalLink}>
                                    {winnerPageProperties.ButtonHoverStyle.LinkButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              {
                                winnerPageProperties.Config.NextButton ? 
                                <div style={{"justifyContent": winnerPageProperties.nextBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                                    <a className='btn btn-primary' style={{...winnerPageProperties.nextBtn, ...nextBtnHoverState}} onMouseEnter={onNextMouseEnter} onMouseLeave={onNextMouseLeave} onClick={() => navigate(`/quiz/preview/registration/${id}`)}>
                                      {winnerPageProperties.ButtonHoverStyle.NextButtonText}
                                    </a>
                                </div> : 
                                <></>
                              }
                              </div>
                              <BackgroundDisplay PageProperties={winnerPageProperties} isEdit={false} PropertySection='background' hasMobileBackground={true} mobileBackgroundSection='mobileBackground' className='background'/>
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

export default WinnerPreviewPage;