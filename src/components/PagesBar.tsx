import { MdCancel, MdEdit, MdOutlineCancel, MdOutlineEdit, MdOutlinePublic, MdOutlinePublish, MdOutlineSave, MdOutlineVisibility, MdPublish, MdSave, MdVisibility } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { sendRequest } from '../helpers/request';
import Urls from '../links';
import { resetFiles } from '../redux/files';
import { initializeProperties as initializeSharedProperties } from '../redux/shared';
import { initializeProperties as initializePresentationProperties } from '../redux/presentationProperties';
import { initializeProperties as initializeWinnerProperties } from '../redux/winnerProperties';
import { initializeProperties as initializeLoserProperties } from '../redux/loserProperties';
import { setQuestions } from '../redux/question';
import { showNotification } from '../redux/notification';
import DataTooltip from './ToolTip';

type PagesBarProps = {
  currentPage: string,
  quizId: string,
  canPreview: boolean,
  canEdit: boolean,
  canNavigate: boolean
}

let PagesBar = ({currentPage, quizId, canPreview = false, canEdit = false, canNavigate = true}:PagesBarProps) => {

  let navigate = useNavigate();

  let onPresentationPageClick = () => {
      if(canNavigate) {
        navigate(`/quiz/presentation/${quizId}`)
      }
  }

  let onQuestionsPageClick = () => {
      if(canNavigate) {
        navigate(`/quiz/questions/${quizId}`)
      }
  }

  let onWinnerPageClick = () => {
    if(canNavigate) {
      navigate(`/quiz/winner/${quizId}`)
    }
  }

  let onLosersPageClick = () => {
    if(canNavigate) {
      navigate(`/quiz/loser/${quizId}`)
    }
  }

  let onPersonalityClick = () => {
    if(canNavigate) {
      navigate(`/quiz/personality/${quizId}`)
    }
  }

  let onRegistrationPageClick = () => {
    if(canNavigate) {
      navigate(`/quiz/registration/${quizId}`)
    }
  }

  let params = useParams();
  let quiz = useAppSelector(state => state.quiz.quiz);
  let questions = useAppSelector(state => state.question.questions);
  let sharedProperties = useAppSelector(state => state.shared);
  let presentationProperties = useAppSelector(state => state.presentation);
  let winnerPageProperties = useAppSelector(state => state.winner);
  let loserPageProperties = useAppSelector(state => state.loser);
  let files = useAppSelector(state => state.files.files);
  let icons = useAppSelector(state => state.socialIcons.icons);
  let registrationQuestions = useAppSelector(state => state.registration.questions);
  let dispatch = useAppDispatch();
  
  let uploadFiles = async (presentationProperties: {}, sharedProperties: {}, questions: [], winnerPageProperties: {}, loserPageProperties: {}) => {
    for(let file of files) {
      if(file.state == "added") {
        let result = await fetch(file.url);
        let blob = await result.blob();
        let newFile = new File([blob], file.fileName);
        let formData = new FormData();
        formData.append("file", newFile);
        formData.append("type", "image")
        formData.append("quizId", quizId);
        let response = await sendRequest(Urls.uploadFile.url(), Urls.uploadFile.type, formData, "", false);
        if(!response.error) {
          //If the image file belongs to the shared properties
          if(file.mainSection == "presentationProperties" && presentationProperties) {
            if(presentationProperties.properties[file.propertySection]["backgroundImage"]) {
              presentationProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
            } else if(presentationProperties.properties[file.propertySection]["backgroundVideo"]) {
              presentationProperties.properties[file.propertySection]["backgroundVideo"] = `url(${response.file.url})`
            } else if(presentationProperties.properties[file.propertySection]["backgroundAudio"]) {
              presentationProperties.properties[file.propertySection]["backgroundAudio"] = `url(${response.file.url})`
            }
          } else if(file.mainSection == "sharedProperties" && sharedProperties) {
            if(sharedProperties.properties[file.propertySection]["backgroundImage"]) {
              sharedProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
            } else if(sharedProperties.properties[file.propertySection]["backgroundAudio"]) {
              sharedProperties.properties[file.propertySection]["backgroundAudio"] = `url(${response.file.url})`
            } else if(sharedProperties.properties[file.propertySection]["backgroundVideo"]) {
              sharedProperties.properties[file.propertySection]["backgroundVideo"] = `url(${response.file.url})`
            }
          } else if(file.mainSection == "question" && file.questionIndex !== undefined && questions) {
            if(questions[file.questionIndex].properties[file.propertySection]["backgroundImage"]) {
              questions[file.questionIndex].properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`;
            } else if(questions[file.questionIndex].properties[file.propertySection]["backgroundAudio"]) {
              questions[file.questionIndex].properties[file.propertySection]["backgroundAudio"] = `url(${response.file.url})`;
            } else if(questions[file.questionIndex].properties[file.propertySection]["backgroundVideo"]) {
              questions[file.questionIndex].properties[file.propertySection]["backgroundVideo"] = `url(${response.file.url})`;
            }
          } else if(file.mainSection == "winnerPageProperties" && winnerPageProperties) {
            if(winnerPageProperties.properties[file.propertySection]["backgroundImage"]) {
              winnerPageProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
            } else if(winnerPageProperties.properties[file.propertySection]["backgroundAudio"]) {
              winnerPageProperties.properties[file.propertySection]["backgroundAudio"] = `url(${response.file.url})`
            } else if(winnerPageProperties.properties[file.propertySection]["backgroundVideo"]) {
              winnerPageProperties.properties[file.propertySection]["backgroundVideo"] = `url(${response.file.url})`
            }
          } else if(file.mainSection == "loserPageProperties" && loserPageProperties) {
            if(loserPageProperties.properties[file.propertySection]["backgroundImage"]) {
              loserPageProperties.properties[file.propertySection]["backgroundImage"] = `url(${response.file.url})`
            } else if(loserPageProperties.properties[file.propertySection]["backgroundAudio"]) {
              loserPageProperties.properties[file.propertySection]["backgroundAudio"] = `url(${response.file.url})`
            } else if(loserPageProperties.properties[file.propertySection]["backgroundVideo"]) {
              loserPageProperties.properties[file.propertySection]["backgroundVideo"] = `url(${response.file.url})`
            }
          }
        }
      } else if (file.state == "removed") {
        let response = await sendRequest(Urls.deleteFileByName.url(file.fileName), Urls.deleteFileByName.type);
      }
    }
    dispatch(resetFiles({}));
  }

  let onSave = async (draft: boolean) => {
    if(params.id) {
      let id = params.id;
      let preProperties = JSON.parse(JSON.stringify(presentationProperties));
      let shProperties = JSON.parse(JSON.stringify(sharedProperties));
      let wpProperties = JSON.parse(JSON.stringify(winnerPageProperties));
      let lsProperties = JSON.parse(JSON.stringify(loserPageProperties));
      let questionObjs = questions.map(question => {
        return {
          _id: question._id,
          quizId: id,
          heading: question.heading,
          options: question.options,
          questionType: question.questionType,
          note: question.note,
          properties: JSON.parse(JSON.stringify(question.properties)),
        }
      })
      await uploadFiles(preProperties, shProperties, questionObjs, wpProperties, lsProperties);

      //Sending Update Request to the server
      let response = await sendRequest(Urls.updateQuiz.url(id), Urls.updateQuiz.type, {
        title: quiz?.title,
        description: quiz?.description,
        presentationProperties: JSON.stringify(preProperties),
        sharedProperties: JSON.stringify(shProperties),
        winnerPageProperties: JSON.stringify(wpProperties),
        loserPageProperties: JSON.stringify(lsProperties),
        isDraft: draft,
      });

      if(!response.error) {

        if(icons) {
          //Recreating the icons
          let recreateResult = await sendRequest(Urls.reCreateIcons.url(id), Urls.reCreateIcons.type, {
            icons: icons.map(i => {
              return {
                quizId: i.quizId,
                url: i.url,
                icon: i.icon
              }
            })
          }, "application/json", true, true);

          if(recreateResult.error) {
            console.log(recreateResult.error);
          }
        }

        if(registrationQuestions) {

          let recreateResult = await sendRequest(Urls.reCreateRegistrationQuestions.url(id), Urls.reCreateRegistrationQuestions.type, {
            questions: registrationQuestions
          }, "application/json", true, true);

          if(recreateResult.error) {
            console.log(recreateResult.error);
          }
        }

        let deleteQuizQuestions = await sendRequest(Urls.deleteQuizQuestions.url(id), Urls.deleteQuizQuestions.type);
        if(deleteQuizQuestions.error) {
          dispatch(showNotification({
            message: deleteQuizQuestions.error,
            isError: true,
          }));
        }
        else {
          dispatch(initializeSharedProperties(shProperties.properties));
          dispatch(initializePresentationProperties(preProperties.properties));
          dispatch(initializeWinnerProperties(wpProperties.properties));
          dispatch(initializeLoserProperties(lsProperties.properties));
          dispatch(setQuestions(questionObjs));
          questionObjs = questionObjs.map(question => {
            return {
              quizId: id,
              heading: question.heading,
              options: question.options,
              questionType: question.questionType,
              properties: JSON.stringify(question.properties),
              note: question.note,
            }
          })
          console.log('Saving Questions: ', questionObjs)
          let createQuizResponse = await sendRequest(Urls.createQuestions.url(id), Urls.createQuestions.type, questionObjs);
          console.log(createQuizResponse)
          if(createQuizResponse.error) {
            dispatch(showNotification({
              message: createQuizResponse.error,
              isError: true,
            }));
          } else {
            dispatch(showNotification({
              message: "Test Saved Successfully",
              isError: false,
            }));
          }
        }

        if(!draft) {
          navigate("/");
        }
      }
      else {
        dispatch(showNotification({
          message: response.error,
          isError: true,
        }));
      }

    }
  }

  let previewQuiz = () => {
    navigate(`/quiz/preview/presentation/${params.id}`);
  }

  let editQuiz = () => {
    navigate(`/quiz/presentation/${params.id}`);
  }

  let onCancel = () => {
    navigate("/");
  }

    return (
      <div className='header'>
        <div className='tabs'>
          <div className={`tab ${currentPage == "presentation" ? 'active' : ''}`} onClick={onPresentationPageClick}>
            Presentation Page
          </div>
          <div className={`tab ${currentPage == "questions" ? 'active' : ''}`} onClick={onQuestionsPageClick}>
            Questions Page
          </div>
          <div className={`tab ${currentPage == "winner" ? 'active' : ''}`} onClick={onWinnerPageClick}>
            Winners Page
          </div>
          <div className={`tab ${currentPage == "losers" ? 'active' : ''}`} onClick={onLosersPageClick}>
            Losers Page
          </div>
          <div className={`tab ${currentPage == "registration" ? 'active' : ''}`} onClick={onRegistrationPageClick}>
            Registration Page
          </div>
          <div className={`tab ${currentPage == "personality" ? 'active' : ''}`} onClick={onPersonalityClick}>
            Personalities Page
          </div>
        </div>
        <div className='d-flex align-items-center'>
          {
            canPreview ? 
            <DataTooltip message="Preview">
              <div className='primary-text-btn me-1' onClick={previewQuiz}>
                <MdOutlineVisibility />
              </div>
            </DataTooltip> : <></>
          }
          {
            canEdit ? 
            <DataTooltip message="Edit">
              <div className='primary-text-btn me-1' onClick={editQuiz}>
                <MdOutlineEdit />
              </div>
            </DataTooltip> : <></>
          }
          <DataTooltip message="Publish">
            <div className='primary-text-btn me-1' onClick={() => onSave(false)}>
              <MdOutlinePublish />
            </div>
          </DataTooltip>
          <DataTooltip message="Save">
            <div className='primary-text-btn me-1' onClick={() => onSave(true)}>
              <MdOutlineSave />
            </div>
          </DataTooltip>
          <DataTooltip message="Cancel">
            <div className='danger-text-btn' onClick={onCancel}>
              <MdOutlineCancel />
            </div>
          </DataTooltip>
        </div>
      </div>
    )
}

export default PagesBar;