import { useEffect, useState } from "react";
import "./QuizPage.css";
import Loader from "../components/Loader";
import PagesBar from "../components/PagesBar";
import { useParams } from "react-router";
import { MdDelete, MdEdit, MdOutlineCancel, MdOutlineDelete, MdOutlineEdit, MdOutlineSave } from "react-icons/md";
import NoResult from '../assets/images/no-result.png';
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { createPersonality, updatePersonality, savePersonality as reduxSavePersonality, editPersonality as reduxEditPersonality, deletePersonality as reduxDeletePersonality, cancelPersonality as reduxCancelPersonality, setId, setPersonalities} from "../redux/personality";
import { sendRequest } from "../helpers/request";
import Urls from "../links";



function PersonalityPage() {
    let [isLoading, setIsLoading] = useState(false);
    let params = useParams();
    let id = params.id;
    let dispath = useAppDispatch();
    let personalities = useAppSelector(state => state.personality.personalities);

    useEffect(() => {
        let loadPersonalities = async () => {
            setIsLoading(true);
            let response = await sendRequest(Urls.getPersonalities.url(id), Urls.getPersonalities.type);
            if(!response.error) {
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
                dispath(setPersonalities(ps));
            }
            setIsLoading(false);
        }

        loadPersonalities();
    }, []);

    let addPersonality = () => {
        dispath(createPersonality({
            _id: '',
            editable: true,
            editName: '',
            isSaved: false,
            name: '',
        }))
    }

    let editName = (index: number, value: string) => {
        dispath(updatePersonality({
            index: index,
            editName: value,
            editDescription: personalities[index].editDescription
        }))
    }

    let editDescription = (index: number, value: string) => {
        dispath(updatePersonality({
            index: index,
            editName: personalities[index].editName,
            editDescription: value
        }))
    }

    let savePersonality = async (index: number) => {

        setIsLoading(true);
        dispath(reduxSavePersonality(index));

        if(personalities[index].isSaved) {
            let response = await sendRequest(Urls.updatePersonality.url(personalities[index]._id), Urls.updatePersonality.type, {
                name: personalities[index].editName,
                description: personalities[index].editDescription
            }, 'application/json', true);
        } else {
            let response = await sendRequest(Urls.createPersonality.url(), Urls.createPersonality.type, {
                name: personalities[index].editName,
                description: personalities[index].editDescription,
                quizId: id
            }, 'application/json', true);
    
            if(!response.error) {
                dispath(setId({
                    index: index,
                    id: response.personality._id,
                }))
            } else {
                console.log(response.error);
            }
        }

        setIsLoading(false);
    }

    let cancelPersonality = (index: number) => {
        dispath(reduxCancelPersonality(index))
    }

    let editPersonality = (index: number) => {
        dispath(reduxEditPersonality(index))
    }

    let deletePersonality = async (index: number) => {
        setIsLoading(true);

        dispath(reduxDeletePersonality(index))

        let response = await sendRequest(Urls.deletePersonality.url(personalities[index]._id), Urls.deletePersonality.type);
        setIsLoading(false);
    }

    return (
        <div className='content-container'>
        {
          isLoading ? 
          <Loader /> : 
        <>
            <div className='quiz-view-container'>
                <div className='header-container'>
                    <PagesBar currentPage={'personality'} quizId={id} canPreview={true} canEdit={false}/>
                </div>
                <div className='page-container d-flex align-items-center flex-column'>
                    <div className="header">
                        <div className="title">Personalities</div>
                        <div className="primary-btn" onClick={addPersonality}>Add Personality</div>
                    </div>
                    <div className="table">
                        <div className="grid-col-3 header">
                            <div className="item">
                                Name
                            </div>
                            <div className="item">
                                Description
                            </div>
                            <div className="item">
                            </div>
                        </div>
                        {
                            personalities.length > 0 ? 
                                personalities.map((personality, index) => {
                                    return (
                                                
                                        <div className="grid-col-3 row editable" key={index}>
                                            {
                                                personality.editable ? 
                                                <>
                                                    <div className="item">
                                                        <input type="text" value={personality.editName} placeholder="Enter name" onChange={e => editName(index, e.target.value)}/>
                                                    </div>
                                                    <div className="item">
                                                        <textarea value={personality.editDescription} placeholder="Enter description" onChange={e => editDescription(index, e.target.value)}/>
                                                    </div>
                                                    <div className="item">
                                                        <div className="primary-text-btn" onClick={() => savePersonality(index)}>
                                                            <MdOutlineSave />
                                                        </div>
                                                        <div className="danger-text-btn" onClick={() => cancelPersonality(index)}>
                                                            <MdOutlineCancel />
                                                        </div>
                                                    </div>
                                                </> : 
                                                <>
                                                    <div className="item">
                                                        {personality.name}
                                                    </div>
                                                    <div className="item">
                                                        {personality.description}
                                                    </div>
                                                    <div className="item">
                                                        <div className="primary-text-btn">
                                                            <MdOutlineEdit onClick={() => editPersonality(index)}/>
                                                        </div>
                                                        <div className="danger-text-btn" onClick={() => deletePersonality(index)}>
                                                            <MdOutlineDelete />
                                                        </div>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                    )
                                }) : 
                                <div className="empty-message">
                                    <img src={NoResult} />
                                    <p>No Personalities Found. Add a personality using the<strong>Add Button</strong></p>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </>
        }
      </div>
    )
}

export default PersonalityPage;