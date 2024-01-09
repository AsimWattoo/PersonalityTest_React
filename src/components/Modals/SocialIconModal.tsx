import { MdCheck, MdCheckCircle, MdClose, MdError, MdErrorOutline } from "react-icons/md";
import "./Modal.css";
import "../../pages/QuizPage.css";
import Select from "../Select";
import { useEffect, useState } from "react";

type socialIconModalState = {
    id: number,
    title: string,
    url: string | null,
    icon: string | null,
    mode: string,
    onSave: (id: number, url: string, icon: string) => void,
    onClose: () => void
}

function SocialIconModal(props: socialIconModalState) {

    let [url, setUrl] = useState('');
    let [icon, setIcon] = useState('');

    useEffect(() => {
        if(props.icon) {
            setIcon(props.icon); 
        } else {
            setIcon("facebook");
        }
        setUrl(props.url ?? "");
    }, [props.url, props.icon])

    let closeModal = () => {
        props.onClose();
    }

    let save = () => {
        props.onSave(props.id, url, icon);
        closeModal();
    }

    let iconOptions = [
        {
            value: "facebook",
            label: "Facebook",
        },
        {
            value: "twitter",
            label: "Twitter",
        },
        {
            value: "linkedin",
            label: "Linkedin"
        },
        {
            value: "instagram",
            label: "Instagram"
        }
    ];

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className={`title`}>
                        {props.title}
                    </div>
                    <div className="secondary-text-btn" onClick={closeModal}>
                        <MdClose />
                    </div>
                </div>
                <div className="modal-body">
                    <div className="input-group mt-2">
                        <label>Icon</label>
                        <Select options={iconOptions} value={icon} onChange={e => setIcon(e.value)} maxHeight={150}/>
                    </div>
                    <div className="input-group mt-2">
                        <label>Url</label>
                        <input type='text' value={url} onChange={e => setUrl(e.currentTarget.value)}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="primary-btn" onClick={save}>
                        {
                            props.mode == "add" ? 
                            "Add" : "Save"
                        }
                    </div>
                    <div className="secondary-btn" onClick={closeModal}>
                        Close
                    </div>
                </div>
            </div>
            <div className="modal-backdrop"></div>
        </div>
    )
}

export default SocialIconModal;