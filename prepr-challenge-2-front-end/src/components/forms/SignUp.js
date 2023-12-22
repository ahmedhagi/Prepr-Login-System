import "./form.css"
import ReCAPTCHA from "react-google-recaptcha"
import Footer from "../footer/footer"
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import {  useNavigate } from 'react-router-dom';
import PasswordStrengthBar  from 'react-password-strength-bar';
import PasswordChecklist from "react-password-checklist"
import { useGoogleLogin } from '@react-oauth/google';



const SignUp= () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cf_pass, setCf_pass] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName] = useState("");
    const [user_type, setUser_type] = useState("");
    const [language, setLanguage] = useState("");
    
  


    const configuration = {
        method: "post",
        url: "http://localhost:3001/register",
        data: {
          email,
          password,
          first_name,
          last_name,
          user_name,
          user_type,
          language
        },
      };

   


    const handleSubmit = (e) => {
        e.preventDefault();
  
        axios(configuration)
        .then((result) => {
             console.log(result)
            window.localStorage.setItem('user', JSON.stringify(result.data.result));
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
       
        <div className="signup-container">
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
                                <div className="form-field position-relative">
                                    <label for="firstName">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/name.png"/></span>
                                        First name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="firstName" 
                                        className="form-control text-field"
                                        value={first_name}  
                                        onChange={(e) =>  setFirstName(e.target.value)}
                                        />
                                   
                                </div>
                                <div className="form-field position-relative">
                                    <label for="lastName">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/name.png"/></span>
                                        Last name
                                    </label>
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        className="form-control text-field"
                                        value={last_name}  
                                        onChange={(e) =>  setLastName(e.target.value)}
                                        />
                                </div>
                                <div className="form-field position-relative">
                                    <label for="userName">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/user.png"/></span>
                                        Username
                                    </label>
                                    <input 
                                        type="text"
                                        name="userName"
                                        className="form-control text-field"
                                        value={user_name}  
                                        onChange={(e) =>  setUserName(e.target.value)}
                                    />
                                </div>
                                <div className="form-field position-relative">
                                    <label for="password">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/password.png"/></span>
                                        Password
                                    </label>
    
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control text-field"
                                        value={password}  
                                        onChange={(e) =>  setPassword(e.target.value)}
                                        />
                                    <span className="pass-eye" >
                                            <FaEye/>
                                    </span>
                                    <PasswordStrengthBar password={password} style={{marginTop:5}} />
                                    <p className=" mb-1" style={{fontSize:13}}>
                                        Password must include :
                                    </p>
                                    <PasswordChecklist
                                        rules={["minLength","specialChar","number","capital"]}
                                        minLength={8}
                                        value={password}
                                        valueAgain={cf_pass}
                                        style={{fontSize:13}}
                                        messages={{
                                            minLength: "8 to 14 characters",
                                            specialChar: "\"1 special character @#$%^&*?_~-()+={}[]|;:'“<>/,.\"",
                                            number: "1 number",
                                            capital: "1 uppercase letter",
                                            match: "",
                                        }}
                                    />
                                </div>
                                <div className="form-field position-relative">
                                    <label for="password">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/pass-check.png"/></span>
                                        Confrim password
                                    </label>
                                    
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control text-field"
                                        value={cf_pass}  
                                        onChange={(e) =>  setCf_pass(e.target.value)}
                                        />
                                    <span className="pass-eye" >
                                            <FaEye/>
                                    </span>
                                </div>
                                <div className="form-field position-relative">
                                    <label for="email">
                                        <span class="label-icon"><img alt="" src="https://d3f06rtlkr354b.cloudfront.net/public/front/img/email.png"/></span>
                                        Email
                                    </label>
                                    <input 
                                        type="text" 
                                        name="email" 
                                        className="form-control text-field"
                                        value={email}  
                                        onChange={(e) =>  setEmail(e.target.value)}
                                        />
                                </div>
                                <div className="form-field">
                                    <select 
                                        className="form-select"
                                        value={user_type}
                                        onChange={(e) =>  setUser_type(e.target.value)}
                                        >
                                        <option selected>User type</option>
                                        <option value="learner">Learner</option>
                                        <option value="job seeker">Job seeker</option>
                                        <option value="employee">employee</option>
                                        <option value="educator">Educator</option>
                                        <option value="mentor">Mentor</option>
                                    </select>
                                </div>
                                <div className="form-field">
                                    <small class="float-end optional"> <i>Optional</i></small>
                                    <select 
                                        className="form-select"
                                        value={language}
                                        onChange={(e) =>  setLanguage(e.target.value)}
                                        >
                                        <option selected>Select Language</option>
                                        <option value="learner">English</option>
                                        <option value="job seeker">French</option>
                                    </select>
                                </div>
                                <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY}/>
                                <p>
                                    <small>
                                    By registering, you agree to the Prepr
                                    <a href="#link"> Terms of use</a>,
                                    <a href="#link">Privacy policy and cookie policy</a>
                                    </small>
                                </p>
                                <div className="d-grid text-center mt-3">
                                    <button className="btn form-submit" onClick={(e) => handleSubmit(e)}>Register</button>
                                </div>
                                <div className="text-center"><p class="or">or</p></div>
                                <div className="d-grid text-center mb-2"> 
                                    <button className="btn sso" onClick={() => login()}>Continue with Google</button>
                                </div>
                                <div className="text-center bottom-links">
                                    Already have an account? <a href="/login">Log in</a>
                                </div>
                                <div className="text-center bottom-links">
                                    Are you an organization? <a href="#link">Organization register</a>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
      
        )
}

export default SignUp