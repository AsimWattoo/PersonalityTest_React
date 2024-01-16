import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/loserProperties';
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import SocialIconModal from '../components/Modals/SocialIconModal';
import type {SocialIcon, SocialIconAdd, SocialIconUpdate} from "../redux/social-icons";
import {addIcon, deleteIcon, updateIcon} from "../redux/social-icons";
import { MdAdd, MdClose } from 'react-icons/md';
import getIcon from '../helpers/icon';


let LosersPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let loserPageProperties = useAppSelector(state => state.loser.properties);
    let socialIcons = useAppSelector(state => state.socialIcons.icons);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [isModalShown, setIsModalShown] = useState(false);
    let [modalTitle, setModalTitle] = useState("Add Icon");
    let [mode, setMode] = useState("add");
    let [url, setUrl] = useState("");
    let [icon, setIcon] = useState("");
    let [index, setIndex] = useState(0);

    let createIcon = () => {
      setMode("add");
      setModalTitle("Add Icon");
      setIsModalShown(true);
    }

    let saveIcon = (iconId: number, url: string, icon: string) => {
      if(mode == "add") {
        let value = {
          quizId: id,
          url: url,
          icon: icon,
        } as SocialIconAdd;
  
        dispatch(addIcon(value))
      } else {
        let update = {
          id: iconId,
          url: url,
          icon: icon
        } as SocialIconUpdate;

        dispatch(updateIcon(update));
      }
    }

    let editIcon = (index: number) => {
      if(socialIcons) {
        setMode("edit");
        let icon = socialIcons.filter((icon, i) => i == index)[0];
        setIcon(icon.icon);
        setIndex(index);
        setUrl(icon.url);
        setModalTitle("Edit Icon");
        setIsModalShown(true);
      }
    }

    let removeIcon = (index: number) => {
      dispatch(deleteIcon(index))
    }

    let closeModal = () => {
      setMode("");
      setIsModalShown(false);
    }

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

    return (
      <div className='content-container'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && loserPageProperties ? 
            <>
              {
                isModalShown ? 
                <SocialIconModal title={modalTitle} onSave={saveIcon} 
                  onClose={closeModal}
                  mode={mode}
                  icon={icon}
                  url={url}
                  id={index}/> : <></>
              }
              <div className='quiz-view-container'>
                <div className='header-container'>
                  <PagesBar currentPage={'losers'} quizId={id} canPreview={true} canEdit={false}/>
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
                      <div className='d-flex align-items-center justify-content-center mt-2 p-2'>
                        {
                          socialIcons ? 
                          socialIcons.map((icon, index) => {
                            return (
                              <div className='social-icon' key={index} onClick={() => editIcon(index)}>
                                <div className='close-icon' onClick={e => {
                                  e.stopPropagation();
                                  removeIcon(index);
                                }}>
                                  <MdClose />
                                </div>
                                {getIcon(icon.icon)()}
                              </div>
                            )
                          })
                          : <></>
                        }
                        <div className='icon-select' onClick={createIcon}>
                          <MdAdd />
                        </div>
                      </div>
                      <div className='d-flex align-items-center w-100'>
                      {
                        loserPageProperties.Config.ShowRestartButton ? 
                        <div style={{"justifyContent": loserPageProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={loserPageProperties.restartBtn}>
                            {loserPageProperties.ButtonHoverStyle.ReStartButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      {
                        loserPageProperties.Config.ShowLinkButton ? 
                        <div style={{"justifyContent": loserPageProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={loserPageProperties.linkBtn}>
                            {loserPageProperties.ButtonHoverStyle.LinkButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      {
                        loserPageProperties.Config.NextButton ? 
                        <div style={{"justifyContent": loserPageProperties.nextBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                            <a className='btn btn-primary' style={loserPageProperties.nextBtn}>
                            {loserPageProperties.ButtonHoverStyle.NextButtonText}
                            </a>
                        </div> : 
                        <></>
                      }
                      </div>
                      <div className='background' style={loserPageProperties.background}></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right-column'>
                <TextCustomization title={'Background'} mainSection={"loserPageProperties"} propertySection={'background'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Mobile Background'} mainSection={"loserPageProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Loser Page Image'} mainSection={"loserPageProperties"} propertySection={'loserImage'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={' Heading'} mainSection={"loserPageProperties"} propertySection={'heading'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Description'} mainSection={"loserPageProperties"} propertySection={'description'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Quiz Button'} mainSection={"loserPageProperties"} propertySection={'restartBtn'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Next Button'} mainSection={"loserPageProperties"} propertySection={'nextBtn'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Quiz Link Button'} mainSection={"loserPageProperties"} propertySection={'linkBtn'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Buttons Hover Style'} mainSection={"loserPageProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Configuration'} mainSection={"loserPageProperties"} propertySection={'Config'} isShared={true} sharedProperties={loserPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default LosersPage;