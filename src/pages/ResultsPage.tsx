import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../redux/hooks";
import { sendRequest } from "../helpers/request";
import Urls from "../links";
import QuizCard from "../components/Quizcard";
import NoResultImage from "../assets/images/no-result.png";
import { MdArrowBack } from "react-icons/md";

let ResultsPage = () => {
    let dispatch = useAppDispatch();
    let navigate = useNavigate();
    let [quizes, setQuizes] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    let loadQuizes = async () => {
        setIsLoading(true);
        let response = await sendRequest(Urls.getAllQuizes.url(), Urls.getAllQuizes.type);
        if(!response.error) {
        setQuizes(response.quizes
            .filter(quiz => !quiz.isDraft)
            .map(quiz => {
                quiz.presentationProperties = JSON.parse(quiz.presentationProperties);
                return quiz;
        }));
        } else {
        console.log(response.error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        loadQuizes();
    }, []);

    let onResultsClick = (id: string) => {
        navigate(`/results/quiz/${id}`)
    };
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
              <div className={`${quizes.length > 0 ? "gridContainer" : ""}`}>
                {
                  quizes.length > 0 ? 
                    quizes.map((quiz, index) => {
                      return (
                        <QuizCard key={index} id={quiz._id} name={quiz.title}
                          isDraft={quiz.isDraft}
                          showResults={true}
                          description={quiz.description}
                          imageProperties={quiz.presentationProperties.properties.presentationImage} 
                          onQuizResult={onResultsClick}/>
                      )
                    }) : 
                    <div className="empty-message">
                      <img src={NoResultImage}/>
                      <p>No Test Found. <strong>Create a new Test</strong> from the main page</p>
                    </div>
                }
              </div>
            </>
          }
        </div>
      </div>
    )
}

export default ResultsPage;