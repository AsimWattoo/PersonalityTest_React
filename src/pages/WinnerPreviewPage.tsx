import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import { MdClose, MdQuestionMark } from 'react-icons/md';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

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
    let [windowWidth, setWindowWidth] = useState(600);
    let [restartBtnHoverState, setRestartBtnHoverState] = useState({});
    let [linkBtnHoverState, setLinkBtnHoverState] = useState({});
    let socialIcons = useAppSelector(state => state.socialIcons.icons);
    console.log(socialIcons)

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

    let getIcon = (ic: string) => {
      if(ic == "facebook") {
        return <FaFacebook />;
      } else if(ic == "instagram") {
        return <FaInstagram />;
      } else if(ic == "twitter") {
        return <FaTwitter />;
      } else if (ic == "linkedin") {
        return <FaLinkedin />;
      } else {
        return <MdQuestionMark />;
      }
    }

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
      }
    }, [winnerPageProperties])
  
    useEffect(() => {
      setWindowWidth(window.innerWidth)
    })

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

    window.onresize = () => {
      setWindowWidth(window.innerWidth)
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
                                        {getIcon(icon.icon)}
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
                              </div>
                              <div className='background' style={windowWidth < 450 ? winnerPageProperties.mobileBackground : winnerPageProperties.background}></div>
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