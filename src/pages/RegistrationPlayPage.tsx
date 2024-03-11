import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import loadData from '../helpers/dataLoader';
import Loader from '../components/Loader';
import CheckBox from '../components/checkbox';
import { MdArrowBack } from 'react-icons/md';
import { sendRequest } from '../helpers/request';
import links from "../links";
import { resetStats } from '../redux/stats';

let RegistrationPlayPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let quiz = useAppSelector(state => state.quiz.quiz);
    let regQuestions = useAppSelector(state => state.registration.questions);
    let stats = useAppSelector(state => state.stats);
    let [isLoading, setIsLoading] = useState(false);
    let [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
    let [valueObj, setValueObj] = useState({});
    let [error, setError] = useState("");

    useEffect(() => {
      if(regQuestions) {
        let valueObj = {};
        valueObj["Name"] = "";
        valueObj["Phone No"] = "";
        valueObj["Email"] = "";
        for(let question of regQuestions) {
          valueObj[question.text] = "";
        }
        setValueObj(valueObj);
      }
    }, [regQuestions]);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        }, true);
      }

    }, []);

    let onTermsAndServicesChange = (val: boolean) => {
      setHasAcceptedTerms(val);
    }

    let changeValue = (text: string, value: string) => {
      let newValue = {...valueObj};
      newValue[text] = value;
      setValueObj(newValue);
    }

    let getDevice = () => {
      if (navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)) {
        return "Mobile";
      } else {
        return "Desktop";
      }
    }

    let submit = async () => {
      setError("");
      let values = []
      let endTime = new Date();
      let startTime = new Date(stats.startTime);
      let totalTimeInMiliseconds = endTime.getTime() - startTime.getTime();
      let totalTimeInSeconds = (totalTimeInMiliseconds / 1000).toFixed(2);

      valueObj["Agreement"] = hasAcceptedTerms ? "Agreed" : "Not Agreed";
      valueObj["Time Played"] = `${totalTimeInSeconds}s`;
      valueObj["Personality"] = stats.personality;
      valueObj["Device"] = getDevice();
      valueObj["External Link Clicked"] = stats.isExternalLinkClicked ? "Yes" : "No";
      for(let questionText of Object.keys(valueObj)) {
        values.push({
          questionText: questionText,
          answer: valueObj[questionText]
        });
      }
      let response = await sendRequest(links.createSubmission.url(id), links.createSubmission.type, {
        submissionDate: new Date(),
        values: values,
      });

      if(response.error) {
        setError(response.error);
      } else {
        dispatch(resetStats({}));
        navigate(`/quiz/thankyou/${id}`)
      }
    }

    return (
      <div className='page preview-page'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz ? 
            <>
            <div className='content-container'>
                <div className='quiz-view-container'>
                    <div className='page-container'>
                        <div className='left-column'>
                          <div className='page-content'>
                            <div className="registration-form-container">
                                <div className="registration-form">
                                    <div className="input-group">
                                        <label>Nimi</label>
                                        <input type="text" className="form-control" onChange={e => changeValue("Name", e.currentTarget.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label>Puhelinnumero</label>
                                        <input type="text" className="form-control" onChange={e => changeValue("Phone No", e.currentTarget.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label>Sähköposti</label>
                                        <input type="email" className="form-control" onChange={e => changeValue("Email", e.currentTarget.value)}/>
                                    </div>
                                    {
                                        regQuestions?.map((question, index) => {
                                            return (
                                            <div className="input-group editable" key={index}>
                                                <label>{question.text}</label>
                                                <input type="text" className="form-control" placeholder="Enter Answer"  onChange={e => changeValue(question.text, e.currentTarget.value)}/>
                                            </div>
                                            )
                                        })
                                    }
                                    <div className="input-group horizontal">
                                        <CheckBox onChange={onTermsAndServicesChange}/>
                                        <label>Olen lukenut säännöt ja hyväksyn ne.</label>
                                    </div>
                                    {
                                      error ? 
                                      <div className='error'>
                                        {error}
                                      </div> : <></>
                                    }
                                    <div className="btn-container">
                                        <div className={`primary-btn`} onClick={submit}>
                                          Osallistu
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default RegistrationPlayPage;