import "./form.css"
import Footer from "../footer/footer"
import axios from "axios";
import { useState, useRef } from "react";
import {  useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';


function Login() {

    const form = useRef();
    let navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  


    const configuration = {
        method: "post",
        url: "http://localhost:3001/login",
        data: {
          email,
          password,
        },
      };

   


    const handleSubmit = (e) => {
        e.preventDefault();
  
        axios(configuration)
        .then((result) => {
             console.log(result)
            window.localStorage.setItem('user', JSON.stringify(result.data.user));
            navigate("/profile");
            window.location.reload();
            
        })
        .catch((error) => {console.log(error);})

    }

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => { 
            console.log(tokenResponse)
            localStorage.clear();
            navigate("/profile");
            window.location.reload();
        },
        onError: error => {
            console.log("error")
            
        }
      });

    

    return (
        <>
        <div className="login-container">
        <div className="container">
            <div className="col-md-12">
                <div className="row">
                    <div className="col-lg-8 col-md-6 side-carousel">
                    <img alt="" src={require("../../assets/sideCarousel.png")}/>
                    </div>
                    <div className="col-lg-4 col-md-6 form signup-form px-0">
                        <div className="d-flex align-items-center justify-content-center logo-title">
                        <div className="logo">
                            <a href="#link"><img alt="" src={require("../../assets/logo.png")}/></a>
                        </div>
                        </div>
                        <div className="form-content">
                            
                            <div className="form-field position-relative" ref={form} >
                                <label for="userName">
                                    <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/user.png"/></span>
                                    User name or email
                                </label>
                                <input 
                                    type="text" 
                                    name="userName"
                                    className="form-control text-field"
                                    value={email}  
                                    onChange={(e) =>  setEmail(e.target.value)}
                                    />
                            </div>
                            <div className="form-field position-relative" ref={form} >
                                <label for="password">
                                    <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/password.png"/></span>
                                    Password
                                </label>

                                <input 
                                    type="password" 
                                    name="password" 
                                    className="form-control text-field"

                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            
                            < div class="forget-password mt-3">
                                    <a href="#link">Forget password?</a>,
                            </div>
                            <div className="d-grid text-center mt-3">
                                <button className="btn form-submit"  onClick={(e) => handleSubmit(e)} >Login</button>
                            </div>
                            <div className="text-center"><p class="or">or</p></div>
                            <div className="d-grid text-center mb-2">
                                <button className="btn sso" onClick={() => login()} >Continue with Google</button>
                            </div>
                            <div className="text-center bottom-links">
                                Don't have an account? <a href="/login">Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Footer/>
    </>
    
    )
}


export default Login;