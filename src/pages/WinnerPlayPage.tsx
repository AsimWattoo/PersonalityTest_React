import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import loadData from '../helpers/dataLoader';
import Loader from '../components/Loader';

let WinnerPlayPage = () => {

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
      if(winnerPageProperties) {
        if(winnerPageProperties.restartBtn.backgroundColor) {
          setRestartBtnHoverState({
            backgroundColor: winnerPageProperties.ButtonHoverStyle.ReStartButtonHoverColor,
            color: winnerPageProperties.ButtonHoverStyle.ReStartButtonHoverTextColor
          })
        }
      }
    }

    useEffect(() => {
      if(winnerPageProperties) {
        setRestartBtnHoverState({
          backgroundColor: winnerPageProperties.restartBtn.backgroundColor,
          color: winnerPageProperties.restartBtn.color
        });
      }
    }, [winnerPageProperties])
  
    useEffect(() => {
      setWindowWidth(window.innerWidth)
    })

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
            console.log(personalities)
            console.log(selectedOptions)
            console.log(personalityDict)
            let scores = Object.values(personalityDict);
            let maxScore = Math.max(...scores);
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
                <div className='left-column'>
                    <div className='page-content'>
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
                        {
                        winnerPageProperties.Config.ShowRestartButton ? 
                        <div style={{"justifyContent": winnerPageProperties.restartBtn["justifyContent"], "width": "50%", "display": "flex"}} onClick={() => navigate(`/quiz/play/presentation/${params.id}`)}>
                            <a className='btn btn-primary' style={restartBtnHoverState} onMouseEnter={onStartMouseEnter} onMouseLeave={onStartMouseLeave}>
                            {winnerPageProperties.ButtonHoverStyle.ReStartButtonText}
                            </a>
                        </div> : 
                        <></>
                        }
                        <div className='background' style={windowWidth < 450 ? winnerPageProperties.mobileBackground : winnerPageProperties.background}></div>
                    </div>
                </div>
            </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default WinnerPlayPage;