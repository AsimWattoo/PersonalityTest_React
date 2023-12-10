import { useEffect, useState } from "react";
import { sendRequest } from "../helpers/request";
import Urls from "../links";
import { MdAdd, MdChevronLeft, MdDelete } from "react-icons/md";
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
        let response = await sendRequest(Urls.deleteFont.url(id), Urls.deleteFont.type);
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
                    <div className="text-btn me-2" onClick={() => navigate("/")}>
                        <MdChevronLeft />
                    </div>
                    <div className="title">
                        Fonts Page
                    </div>
                </div>
                <div className="btn btn-primary d-flex align-items-center" onClick={() => navigate("/settings/fonts/add")}>
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
                        <div className="heading">Fonts</div>
                        {
                            fonts.map((font, index) => {
                                return (
                                    <div className="font" key={index}>
                                        <div className="name">{font.name}</div>
                                        <div className="btn btn-danger" onClick={() => deleteFont(font._id)}>
                                            <MdDelete />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default FontsPage;