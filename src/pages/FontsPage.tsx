import { useEffect, useState } from "react";
import { sendRequest } from "../helpers/request";
import Urls from "../links";
import { MdAdd, MdChevronLeft, MdDelete, MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router";

function FontsPage() {
    let [fonts, setFonts] = useState([]);
    let navigate = useNavigate();

    let loadFonts = async () => {
        let response = await sendRequest(Urls.getFonts.url(), Urls.getFonts.type);
        console.log(response)
        if (response.error) {
            console.log(response.error)
        } else {
            setFonts(response.files);
        }
    }

    useEffect(() => {
        loadFonts();
    }, []);

    let deleteFont = async (id: string) => {
        let response = await sendRequest(Urls.deleteFile.url(id), Urls.deleteFile.type);
        if(response.error) {
            alert(response.error);
        } else {
            loadFonts();
        }
    }

    return (
        <div className="inner-page">
            <div className="header">
                <div className="d-flex align-items-center">
                    <div className="primary-text-btn me-2" onClick={() => navigate("/")}>
                        <MdChevronLeft />
                    </div>
                    <div className="title">
                        Fonts Page
                    </div>
                </div>
                <div className="primary-btn d-flex align-items-center" onClick={() => navigate("/settings/fonts/add")}>
                    <MdAdd className="me-2"/>
                    Add Font
                </div>
            </div>
            <div className="inner-page-content">
                {
                    fonts.length == 0 ? 
                    <div className="empty-message">
                        <p>No font found. Use the <strong>Add button </strong> to create a font.</p>
                    </div> :
                    <div className="fonts">
                        <div className="table">
                            <div className="grid-col-2 table-header">
                                <div className="item">
                                    Font Family
                                </div>
                                <div></div>
                            </div>
                            {
                                fonts.map((font, index) => {
                                    return (
                                        <div className="grid-col-2 table-row" key={index}>
                                            <div className="item">{font.name}</div>
                                            <div className="item">
                                                <div className="danger-text-btn" onClick={() => deleteFont(font._id)}>
                                                    <MdOutlineDelete />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default FontsPage;