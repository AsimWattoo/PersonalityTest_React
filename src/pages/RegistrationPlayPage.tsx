import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import getIcon from '../helpers/icon';
import CheckBox from '../components/checkbox';
import { MdArrowBack } from 'react-icons/md';
import { sendRequest } from '../helpers/request';
import links from "../links";

let RegistrationPlayPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let quiz = useAppSelector(state => state.quiz.quiz);
    let regQuestions = useAppSelector(state => state.registration.questions);
    let [isLoading, setIsLoading] = useState(false);
    let [canSubmit, setCanSubmit] = useState(false);
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
      setCanSubmit(val);
    }

    let changeValue = (text: string, value: string) => {
      let newValue = {...valueObj};
      newValue[text] = value;
      setValueObj(newValue);
    }

    let submit = async () => {
      setError("");
      let values = []
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
                                        <label>Name</label>
                                        <input type="text" className="form-control" onChange={e => changeValue("Name", e.currentTarget.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label>Phone No.</label>
                                        <input type="text" className="form-control" onChange={e => changeValue("Phone No", e.currentTarget.value)}/>
                                    </div>
                                    <div className="input-group">
                                        <label>Email</label>
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
                                        <label>I have read the terms and conditions & I accept them</label>
                                    </div>
                                    {
                                      error ? 
                                      <div className='error'>
                                        {error}
                                      </div> : <></>
                                    }
                                    <div className="btn-container">
                                        <div className="danger-outline-btn" onClick={() => navigate(`/quiz/play/presentation/${id}`)}>
                                            <MdArrowBack /> Back
                                        </div>
                                        <div className={`primary-btn ${canSubmit ? "" : "disabled"}`} onClick={submit}>
                                            Submit
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