import "./QuizPage.css"
import NavigationBar from "../NavigationBar";
import SettingsSidebar from "../components/SettingsSidebar";
import { Outlet } from "react-router";

let SettingsPage = () => {
    return (
        <div className="page">
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