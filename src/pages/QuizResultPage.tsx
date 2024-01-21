import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { sendRequest } from "../helpers/request";
import Urls from "../links";
import QuizCard from "../components/Quizcard";
import NoResultImage from "../assets/images/no-result.png";
import { MdArrowBack } from "react-icons/md";

let QuizResultPage = () => {
    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(true);
    let [results, setResults] = useState([]);
    let params = useParams();
    let id = params.id;

    let loadResults = async () => {
        setIsLoading(true);
        let response = await sendRequest(Urls.getSubmissions.url(id), Urls.getSubmissions.type);
        if(!response.error) {
          setResults(response.submissions);
          console.log(response);
        } else {
            console.log(response.error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadResults();
    }, []);

    return (
    <div className="quiz-view-container">
        <div className="container">
          {
            isLoading ? 
            <Loader /> : 
            <>
              <div className="d-flex align-items-center justify-content-start">
                <div className="primary-text-btn" onClick={() => navigate(-1)}>
                  <MdArrowBack />
                </div>
              </div>
              <div className="table-container">
                <div className="table auto">
                  {
                    results.length > 0 ? 
                    <>
                      <div className="table-header">
                        {
                          results[0].values.map((val, index) => {
                            return (
                              <div key={index}>
                                {val.questionText}
                              </div>
                            )
                          })
                        }
                      </div>
                      {
                        results.map((res, index) => {
                          return (
                            <div className="table-row">
                              {
                                res.values.map((val, index) => {
                                  return (
                                    <div key={index}>
                                      {val.answer}
                                    </div>
                                  )
                                })
                              }
                            </div>
                          )
                        })
                      }
                    </> : 
                    <div className="empty-message">
                      <img src={NoResultImage}/>
                      <p>No Submissions Found. </p>
                    </div>
                  }
                </div>
              </div>
            </>
          }
        </div>
      </div>
    )
}

export default QuizResultPage;