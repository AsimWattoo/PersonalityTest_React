import { MdCheck, MdCheckCircle, MdClose, MdError, MdErrorOutline } from "react-icons/md";
import "./Modal.css";

function ConfirmationModal({title, message, onConfirm, onClose}) {

    return (
        <div className="modal-container">
            <div className="modal">
                <div className="modal-header">
                    <div className={`title`}>
                        {title}
                    </div>
                    <div className="secondary-text-btn" onClick={onClose}>
                        <MdClose />
                    </div>
                </div>
                <div className="modal-body">
                    {message}
                </div>
                <div className="modal-footer">
                    <div className="secondary-outline-btn" onClick={onClose}>
                        Close
                    </div>
                    <div className="danger-outline-btn" onClick={onConfirm}>
                        Confirm
                    </div>
                </div>
            </div>
            <div className="modal-backdrop"></div>
        </div>
    )
}

export default ConfirmationModal;