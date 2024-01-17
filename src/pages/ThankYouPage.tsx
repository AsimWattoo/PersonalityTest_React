import { useNavigate, useParams } from 'react-router';

let ThankYouPage = () => {

    let params = useParams();
    let id = params.id
    let navigate = useNavigate();

    return (
      <div className='page preview-page'>
        <div className='content-container'>
            <div className='quiz-view-container'>
                <div className='page-container'>
                    <div className='left-column'>
                        <div className='page-content'>
                            <h1>Thank You</h1>
                            <h4>You submission has been collected.</h4>
                            <div className='primary-btn' onClick={() => navigate(`/quiz/play/presentation/${id}`)}>
                                Restart
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default ThankYouPage;