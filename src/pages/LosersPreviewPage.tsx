import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';

let LoserPreviewPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let loserPageProperties = useAppSelector(state => state.loser.properties);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [windowWidth, setWindowWidth] = useState(600);
    let [restartBtnHoverState, setRestartBtnHoverState] = useState({});

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
                              <div style={{...loserPageProperties.loserImage, "transition": "all 0.2s ease-in-out"}}></div>
                              <div style={loserPageProperties.heading}>
                                Looser
                              </div>
                              <div style={loserPageProperties.description}>
                                You have failed the test and have not fallen in any category. try changing your answers.
                              </div>
                              {
                              loserPageProperties.Config.ShowRestartButton ? 
                              <div style={{"justifyContent": loserPageProperties.restartBtn["justifyContent"], "width": "50%", "display": "flex"}} onClick={() => navigate(`/quiz/preview/presentation/${params.id}`)}>
                                  <a className='btn btn-primary' style={{ ...loserPageProperties.restartBtn, ...restartBtnHoverState}} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                                  {loserPageProperties.ButtonHoverStyle.ReStartButtonText}
                                  </a>
                              </div> : 
                              <></>
                              }
                              <div className='background' style={windowWidth < 450 ? loserPageProperties.mobileBackground : loserPageProperties.background}></div>
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