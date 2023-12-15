import { useState } from "react";
import { MdAdd, MdChevronLeft, MdSave } from "react-icons/md";
import { useNavigate } from "react-router";
import { sendRequest } from "../helpers/request";
import Urls from "../links";

function FontAddPage() {
    let navigate = useNavigate();
    let [name, setName] = useState("");
    let [file, setFile] = useState();
    let [error, setError] = useState('');

    let saveFont = async () => {
        let formData = new FormData();
        formData.append('name', name);
        formData.append('type', 'font');
        formData.append('file', file);
        let response = await sendRequest(Urls.createFont.url(), Urls.createFont.type, formData, 'multipart/form-data;', false);
        if(response.error){
            setError(response.error);
        } else {
            navigate(-1);
        }
    }

    return (
        <div className="inner-page">
            <div className="header">
                <div className="d-flex align-items-center">
                    <div className="primary-text-btn me-2" onClick={() => navigate(-1)}>
                        <MdChevronLeft />
                    </div>
                    <div className="title">
                        Fonts Page
                    </div>
                </div>
                <div className="d-flex align-items-center">
                    <div className="danger-outline-btn me-2" onClick={() => navigate(-1)}>
                        Cancel
                    </div>
                    <div className="primary-btn d-flex align-items-center" onClick={saveFont}>
                        <MdSave className="me-2"/>
                        Save
                    </div>
                </div>
            </div>
            <div className="inner-page-content">
                <form>
                    <div className="grid grid-col-2">
                        <div className="input-group">
                            <label>Font Name</label>
                            <input type="text" onChange={e => setName(e.target.value)} className="form-control"/>
                        </div>
                        <div className="input-group">
                            <label>File</label>
                            <input type="file" accept=".ttf" className="form-control" onChange={e => setFile(e.target.files[0])}/>
                        </div>
                    </div>
                    {
                        error ? 
                        <div className="error mt-2">
                            {error}
                        </div> : <></>
                    }
                </form>
            </div>
        </div>
    )
}

export default FontAddPage;