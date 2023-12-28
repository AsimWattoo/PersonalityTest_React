import { useState } from "react";
import "../App.css";
import { MdError, MdOutlineError } from "react-icons/md";
import { useNavigate } from "react-router";
import { sendRequest } from "../helpers/request";
import links from '../links';
import Loader from "../components/Loader";

function RegisterPage() {
    let [email, setEmail] = useState('');
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [confirmPassword, setConfirmPassword] = useState('');
    let [error, setError] = useState('');
    let [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();

    let register = async () => {
        setError('');
        if(!email || !username || !password || !confirmPassword) {
            setError("Invalid Data. Please ensure all fields are filled");
            return;
        } else if(password != confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);
        let response = await sendRequest(links.register.url(), links.register.type, {
            email: email,
            username: username,
            password: password
        }, 'application/json', true, false);

        if(response.error) {
            setError(response.error);
        } else {
            navigate("/login");
        }

        setIsLoading(false);
    }

    return (
        <div className="full-page">
            <div className="page-center">
                <div className="registration-page">
                    <div className="form">
                        <div className="title">
                            Register at PersonalityTest
                        </div>
                        <div className="note">
                            Already have an account? <a href="/login">Login</a> now.
                        </div>
                        <div className="input-controls">
                            <div className="input-group">
                                <input type='text' placeholder="example@gmail.com" value={email} onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type='text' placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type='password' placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>
                            <div className="input-group">
                                <input type='password' placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
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
                                    <Loader showMessage={false} isSmall={true}/> : 
                                </div> : 
                                <div className="primary-btn" onClick={register}>
                                    Register
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

export default RegisterPage;