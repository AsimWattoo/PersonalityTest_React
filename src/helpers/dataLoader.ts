import Urls from "../links";
import { useAppDispatch } from "../redux/hooks";
import { sendRequest } from "./request";
import { setQuiz } from "../redux/quiz";
import { initializeProperties } from "../redux/presentationProperties";
import type { Quiz } from "../redux/quiz";
import { initializeProperties as initializeSharedProperties } from "../redux/shared";
import { initializeProperties as initializeWinnerPageProperties } from "../redux/winnerProperties";
import { setQuestions } from "../redux/question";
import { FaLongArrowAltDown } from "react-icons/fa";
import { setPersonalities } from "../redux/personality";

let loadQuizData = async (id: string, dispatch) => {
    let response = await sendRequest(Urls.getQuiz.url(id), Urls.getQuiz.type);
    if(response.error) {

    }
    else {
      response.quiz.presentationProperties = JSON.parse(response.quiz.presentationProperties);
      response.quiz.sharedProperties = JSON.parse(response.quiz.sharedProperties);
      response.quiz.winnerPageProperties = JSON.parse(response.quiz.winnerPageProperties);
      let routeQuiz = response.quiz;
        dispatch(setQuiz({
            id: routeQuiz._id,
            description: routeQuiz.description,
            title: routeQuiz.title,
            presentationProperties: routeQuiz.presentationProperties,
            sharedProperties: routeQuiz.sharedProperties,
            isDraft: routeQuiz.isDraft
        } as Quiz))
        dispatch(initializeProperties(routeQuiz.presentationProperties.properties))
        dispatch(initializeSharedProperties(routeQuiz.sharedProperties.properties))
        dispatch(initializeWinnerPageProperties(routeQuiz.winnerPageProperties.properties));
    }
  }

let loadQuestions = async (id: string, dispatch) => {
  let questionResponse = await sendRequest(Urls.getQuestions.url(id), Urls.getQuestions.type);
  if(questionResponse.error) {
      console.log(questionResponse.error);
  }
  else {
      questionResponse.questions = questionResponse.questions.map(question => {
      question.properties = JSON.parse(question.properties);
      return question;
      })
      dispatch(setQuestions(questionResponse.questions))
  }
}

let loadPersonalities = async (id: string, dispatch) => {
  let response = await sendRequest(Urls.getPersonalities.url(id), Urls.getPersonalities.type);
  if(response.error) {
    console.log(response.error);
  } else {
    let ps = response.personalities.map(p => {
      return {
          _id: p._id,
          name: p.name,
          editName: p.name,
          description: p.description,
          editDescription: p.description,
          isSaved: true,
          editable: false
      }
    });
    dispatch(setPersonalities(ps));
  }
}

let loadData = async (id: string, dispatch, cb: () => {}) => {
    await loadQuizData(id, dispatch);
    await loadQuestions(id, dispatch);
    await loadPersonalities(id, dispatch);
    if(cb) {
      cb();
    }
}

export default loadData;