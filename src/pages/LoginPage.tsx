import { useState } from "react";
import "../App.css";
import { MdError, MdOutlineError } from "react-icons/md";
import { useNavigate } from "react-router";
import { sendRequest } from "../helpers/request";
import links from '../links';
import Loader from "../components/Loader";
import { storeToken } from "../helpers/token";

function LoginPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [error, setError] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    let register = async () => {
        setError('');
        if(!email || !password) {
            setError("Invalid Data. Please ensure all fields are filled");
            return;
        }

        setIsLoading(true);
        let response = await sendRequest(links.login.url(), links.login.type, {
            email: email,
            password: password
        }, 'application/json', true, false);
        if(response.error) {
            setError(response.error);
        } else {
            storeToken(response.token);
            navigate("/");
        }

        setIsLoading(false);
    }

    return (
        <div className="full-page">
            <div className="page-center">
                <div className="registration-page">
                    <div className="form">
                        <div className="title">
                            Admin Login at PersonalityTest
                        </div>
                        <div className="input-controls">
                            <div className="input-group">
                                <input type='text' placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                            {
                                error ? 
                                <div className="error mb-2 mt-1">
                                    <MdOutlineError /> {error}
                                </div> : <></>
                            }
                            {
                                isLoading ? 
                                <div className="registration-loader">
                                    <Loader showMessage={false} isSmall={true}/>
                                </div>
                                : 
                                <div className="primary-btn" onClick={register}>
                                    Login
                                </div>
                            }
                        </div>
                    </div>
                    <div className="image">
                        <div className="img"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;