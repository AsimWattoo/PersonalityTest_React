import { MdCheck, MdCheckCircle, MdClose, MdError, MdErrorOutline } from "react-icons/md";
import "./Modal.css";
import { hideNotification } from "../../redux/notification";
import { useAppDispatch } from "../../redux/hooks";

function NotificationModal({message, isError}) {
    let dispatch = useAppDispatch();

    let closeNotification = () => {
        dispatch(hideNotification({}));
    }

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className={`title ${isError ? 'modal-error-message' : 'modal-success-message'}`}>
                        {
                            isError ? 
                            <MdErrorOutline /> : 
                            <MdCheckCircle />
                        }
                        {isError ? "Error" : 'Success'}
                    </div>
                    <div className="secondary-text-btn" onClick={closeNotification}>
                        <MdClose />
                    </div>
                </div>
                <div className="modal-body">
                    {message}
                </div>
                <div className="modal-footer">
                    <div className="secondary-btn" onClick={closeNotification}>
                        Close
                    </div>
                </div>
            </div>
            <div className="modal-backdrop"></div>
        </div>
    )
}

export default NotificationModal;