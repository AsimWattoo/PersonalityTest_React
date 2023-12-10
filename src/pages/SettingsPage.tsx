import "./QuizPage.css"
import NavigationBar from "../NavigationBar";
import SettingsSidebar from "../components/SettingsSidebar";
import { Outlet } from "react-router";

let SettingsPage = () => {
    return (
        <div className="page">
            <NavigationBar hasEditBtn={false} hasPreview={false} hasSubmitBtn={false} hasCancelBtn={false}/>
            <div className="settings-section">
                <div className="sidebar-container">
                    <SettingsSidebar />
                </div>
                <div className="settings-page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default SettingsPage;