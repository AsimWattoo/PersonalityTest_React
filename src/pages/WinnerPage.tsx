import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import TextCustomization from '../TextCustomization';
import { updateProperty, removeProperty, addProperty, initializeProperties } from '../redux/winnerProperties';
import {addIcon, deleteIcon, updateIcon} from "../redux/social-icons";
import type {SocialIcon, SocialIconAdd, SocialIconUpdate} from "../redux/social-icons";
import loadData from '../helpers/dataLoader';
import PagesBar from '../components/PagesBar';
import Loader from '../components/Loader';
import { MdAdd, MdClose, MdFacebook, MdSettingsInputComponent } from 'react-icons/md';
import SocialIconModal from '../components/Modals/SocialIconModal';
import getIcon from '../helpers/icon';
import BackgroundDisplay from '../components/BackgroundDisplay';

let WinnerPage = () => {

    let params = useParams();
    let id = params.id
    let dispatch = useAppDispatch();
    let winnerPageProperties = useAppSelector(state => state.winner.properties);
    let socialIcons = useAppSelector(state => state.socialIcons.icons);
    let quiz = useAppSelector(state => state.quiz.quiz);
    let [isLoading, setIsLoading] = useState(false);
    let [isModalShown, setIsModalShown] = useState(false);
    let [modalTitle, setModalTitle] = useState("Add Icon");
    let [mode, setMode] = useState("add");
    let [url, setUrl] = useState("");
    let [icon, setIcon] = useState("");
    let [index, setIndex] = useState(0);

    useEffect(() => {

      if(!quiz || !quiz.title) {
        setIsLoading(true);
        loadData(id, dispatch, () => {
          setIsLoading(false);
        });
      }

    }, []);

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

    return (
      <div className='content-container'>
        {
          isLoading ? 
          <Loader /> : 
          (
            quiz && winnerPageProperties ? 
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
                  <PagesBar currentPage={'winner'} quizId={id} canPreview={true} canEdit={false}/>
                </div>
                <div className='page-container'>
                  <div className='left-column'>
                    <div className='page-content'>
                      <BackgroundDisplay PageProperties={winnerPageProperties} isEdit={true} PropertySection='winnerImage' hasMobileBackground={false} mobileBackgroundSection='' className=''/>
                      <div style={winnerPageProperties.heading}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div>
                      <div style={winnerPageProperties.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque non mauris lectus. Aenean accumsan molestie ante, non tincidunt arcu tempor ut. Aenean ullamcorper sapien eget consequat vulputate. Ut dapibus felis lectus, vel finibus odio lacinia vitae. Praesent faucibus, ex eu rutrum ornare, ipsum tortor consectetur neque, quis laoreet risus nunc laoreet turpis. Sed eget nulla id arcu finibus malesuada. Nunc a pulvinar nisl. Proin leo nibh, tincidunt sit amet volutpat et, faucibus quis urna.
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
                          winnerPageProperties.Config.ShowRestartButton ? 
                          <div style={{"justifyContent": winnerPageProperties.restartBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                              <a className='btn btn-primary' style={winnerPageProperties.restartBtn}>
                              {winnerPageProperties.ButtonHoverStyle.ReStartButtonText}
                              </a>
                          </div> : 
                          <></>
                        }
                        {
                          winnerPageProperties.Config.ShowLinkButton ? 
                          <div style={{"justifyContent": winnerPageProperties.linkBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                              <a className='btn btn-primary' style={winnerPageProperties.linkBtn}>
                              {winnerPageProperties.ButtonHoverStyle.LinkButtonText}
                              </a>
                          </div> : 
                          <></>
                        }
                        {
                          winnerPageProperties.Config.NextButton ? 
                          <div style={{"justifyContent": winnerPageProperties.nextBtn["justifyContent"], "width": "100%", "display": "flex"}}>
                              <a className='btn btn-primary' style={winnerPageProperties.nextBtn}>
                              {winnerPageProperties.ButtonHoverStyle.NextButtonText}
                              </a>
                          </div> : 
                          <></>
                        }
                      </div>
                      <BackgroundDisplay PageProperties={winnerPageProperties} isEdit={true} PropertySection='background' hasMobileBackground={false} mobileBackgroundSection='' className='background'/>
                    </div>
                  </div>
                </div>
              </div>
              <div className='right-column'>
                <TextCustomization title={'Background'} mainSection={"winnerPageProperties"} propertySection={'background'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Mobile Background'} mainSection={"winnerPageProperties"} propertySection={'mobileBackground'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Winner Page Image'} mainSection={"winnerPageProperties"} propertySection={'winnerImage'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Heading'} mainSection={"winnerPageProperties"} propertySection={'heading'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Description'} mainSection={"winnerPageProperties"} propertySection={'description'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Restart Quiz Button'} mainSection={"winnerPageProperties"} propertySection={'restartBtn'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Next Button'} mainSection={"winnerPageProperties"} propertySection={'nextBtn'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Quiz Link Button'} mainSection={"winnerPageProperties"} propertySection={'linkBtn'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Buttons Hover Style'} mainSection={"winnerPageProperties"} propertySection={'ButtonHoverStyle'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
                <TextCustomization title={'Configuration'} mainSection={"winnerPageProperties"} propertySection={'Config'} isShared={true} sharedProperties={winnerPageProperties} addSharedProperty={addProperty} removeSharedProperty={removeProperty} updateSharedProperty={updateProperty}/>
              </div>
            </> : <></>
          )
        }
      </div>
    )
}

export default WinnerPage;