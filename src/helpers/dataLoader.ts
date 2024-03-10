import Urls from "../links";
import { useAppDispatch } from "../redux/hooks";
import { sendRequest } from "./request";
import { setQuiz } from "../redux/quiz";
import { initializeProperties } from "../redux/presentationProperties";
import type { Quiz } from "../redux/quiz";
import { initializeProperties as initializeSharedProperties } from "../redux/shared";
import { initializeProperties as initializeWinnerPageProperties } from "../redux/winnerProperties";
import { initializeProperties as initializeLoserPageProperties } from "../redux/loserProperties";
import { setQuestions } from "../redux/question";
import { setPersonalities } from "../redux/personality";
import { setIcons } from "../redux/social-icons";
import { setQuestions as setRegistrationQuestions } from "../redux/registration";

let loadQuizData = async (id: string, dispatch, isPublished: boolean = false) => {
    let response = 
    isPublished ? await sendRequest(Urls.getPublishedQuiz.url(id), Urls.getPublishedQuiz.type, null, '', true, false) 
    : await sendRequest(Urls.getQuiz.url(id), Urls.getQuiz.type);

    if(response.error) {

    }
    else {
      if(response.quiz) {
        response.quiz.presentationProperties = JSON.parse(response.quiz.presentationProperties);
        response.quiz.sharedProperties = JSON.parse(response.quiz.sharedProperties);
        response.quiz.winnerPageProperties = JSON.parse(response.quiz.winnerPageProperties);
        response.quiz.loserPageProperties = JSON.parse(response.quiz.loserPageProperties);
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
          dispatch(initializeLoserPageProperties(routeQuiz.loserPageProperties.properties));
      }
    }
  }

let loadQuestions = async (id: string, dispatch, isPublished: boolean = false) => {
  let questionResponse = isPublished ? await sendRequest(Urls.getPublishedQuestions.url(id), Urls.getPublishedQuestions.type, null, '', true, false) 
    : await sendRequest(Urls.getQuestions.url(id), Urls.getQuestions.type);
  if(questionResponse.error) {
      console.log(questionResponse.error);
  }
  else {
      questionResponse.questions = questionResponse.questions.map(question => {
        if(!question.questionType) {
          question.questionType = "question";
        }
        question.properties = JSON.parse(question.properties);
        question.options = question.options.map(option => {
          return {
            _id: option._id,
            text: option.text,
            value: option.value,
            personalityId: option.personalityId,
            selected: false,
          }
        })
        return question;
      })
      dispatch(setQuestions(questionResponse.questions))
  }
}

let loadPersonalities = async (id: string, dispatch, isPublished: boolean = false) => {
  let response = isPublished ? await sendRequest(Urls.getPublishedPersonalities.url(id), Urls.getPublishedPersonalities.type, null, '', true, false) 
  : await sendRequest(Urls.getPersonalities.url(id), Urls.getPersonalities.type);
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

let loadSocialIcons = async (id: string, dispatch, isPublished: boolean = false) => {
  let response = isPublished ? 
  await sendRequest(Urls.getPublishedIcons.url(id), Urls.getPublishedIcons.type, null, '', true, false) 
  : await sendRequest(Urls.getAllIcons.url(id), Urls.getAllIcons.type);
  if(response.error) {
    console.log(response.error);
  } else {
    let icons = response.icons.map(p => {
      return {
          _id: p._id,
          quizId: p.quizId,
          url: p.url,
          icon: p.icon
      }
    });
    dispatch(setIcons(icons));
  }
}

let loadRegistrationQuestions = async (id: string, dispatch, isPublished: boolean = false) => {
  let response = isPublished ? 
  await sendRequest(Urls.getPublishedRegistrationQuestions.url(id), Urls.getPublishedRegistrationQuestions.type, null, '', true, false) 
  : await sendRequest(Urls.getRegistrationQuestions.url(id), Urls.getRegistrationQuestions.type);
  if(response.error) {
    console.log(response.error);
  } else {
    let regQuestions = response.questions.map(q => {
      return {
          id: q.id,
          text: q.text
      }
    });
    dispatch(setRegistrationQuestions(regQuestions));
  }
}

let loadData = async (id: string, dispatch, cb: () => {}, isPublished: boolean = false) => {
    await loadQuizData(id, dispatch, isPublished);
    await loadQuestions(id, dispatch, isPublished);
    await loadPersonalities(id, dispatch, isPublished);
    await loadSocialIcons(id, dispatch, isPublished);
    await loadRegistrationQuestions(id, dispatch, isPublished);
    if(cb) {
      cb();
    }
}

export default loadData;