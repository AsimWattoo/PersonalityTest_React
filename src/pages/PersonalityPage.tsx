import { useState } from "react";
import "./QuizPage.css";
import Loader from "../components/Loader";
import PagesBar from "../components/PagesBar";
import { useParams } from "react-router";
import { MdDelete, MdEdit, MdOutlineCancel, MdOutlineDelete, MdOutlineEdit, MdOutlineSave } from "react-icons/md";
import NoResult from '../assets/images/no-result.png';

type Personality = {
    name: string,
    editName: string,
    editable: boolean,
    isSaved: boolean
}

function PersonalityPage() {
    let [isLoading, setIsLoading] = useState(false);
    let [personalities, setPersonalities] = useState([] as Personality[]);
    let params = useParams();
    let id = params.id;

    let addPersonality = () => {
        setPersonalities([...personalities, {
            name: "",
            editName: "",
            isSaved: false,
            editable: true,
        }])
    }

    let editName = (index: number, value: string) => {
        let newPersonalities = [...personalities];
        newPersonalities[index].editName = value;
        setPersonalities(newPersonalities);
    }

    let savePersonality = (index: number) => {
        let newPersonalities = [...personalities];
        newPersonalities[index].name = newPersonalities[index].editName;
        newPersonalities[index].editable = false;
        newPersonalities[index].isSaved = true;
        setPersonalities(newPersonalities);
    }

    let cancelPersonality = (index: number) => {
        if(personalities[index].isSaved) {
            let newPersonalities = [...personalities];
            newPersonalities[index].editable = false;
            newPersonalities[index].isSaved = true;
            setPersonalities(newPersonalities);
        } else {
            let newPersonalities = [...personalities.filter((p, i) => i != index)];
            setPersonalities(newPersonalities);
        }
    }

    let editPersonality = (index: number) => {
        let newPersonalities = [...personalities];
        newPersonalities[index].editable = true;
        newPersonalities[index].editName = newPersonalities[index].name;
        setPersonalities(newPersonalities);
    }

    let deletePersonality = (index: number) => {
        let newPersonalities = personalities.filter((p, i) => i != index);
        setPersonalities([...newPersonalities]);
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
                        <div className="grid-col-2 header">
                            <div className="item">
                                Personality Name
                            </div>
                            <div className="item">
                            </div>
                        </div>
                        {
                            personalities.length > 0 ? 
                                personalities.map((personality, index) => {
                                    return (
                                                
                                        <div className="grid-col-2 row editable">
                                            {
                                                personality.editable ? 
                                                <>
                                                    <div className="item">
                                                        <input type="text" value={personality.editName} placeholder="Enter name" onChange={e => editName(index, e.target.value)}/>
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