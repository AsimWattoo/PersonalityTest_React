import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { sendRequest } from "../helpers/request";
import Urls from "../links";
import QuizCard from "../components/Quizcard";
import NoResultImage from "../assets/images/no-result.png";
import { MdArrowBack, MdOutlineTableRows, MdTableRows } from "react-icons/md";
import {CSVLink} from "react-csv";

let QuizResultPage = () => {
    let navigate = useNavigate();
    let [isLoading, setIsLoading] = useState(true);
    let [results, setResults] = useState([]);
    let [csvData, setCsvData] = useState([]);
    let params = useParams();
    let id = params.id;

    let loadResults = async () => {
        setIsLoading(true);
        let response = await sendRequest(Urls.getSubmissions.url(id), Urls.getSubmissions.type);
        if(!response.error) {
          setResults(response.submissions);

          if(response.submissions.length > 0) {
            let data = response.submissions;
            //Creating the csv data
            let header = data[0].values.map((val, index) => val.questionText);
            let rows = data.map((res, index) => {
              return res.values.map(val => val.answer.toString())
            });

            setCsvData([
              header,
              ...rows
            ]);
          }

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
              <div className="d-flex align-items-center justify-content-between">
                <div className="primary-text-btn" onClick={() => navigate(-1)}>
                  <MdArrowBack />
                </div>
                <CSVLink className="primary-btn" filename="result.csv" data={csvData}>
                  <MdOutlineTableRows />
                  Export to CSV
                </CSVLink>
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