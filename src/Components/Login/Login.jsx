import Cookie from "js-cookie"

import React, { useContext, useEffect, useState } from 'react';
import './Login.css';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate, Navigate} from 'react-router-dom';
import WelcomeToTraiflix from '../WelcomeToTraiflix/WelcomeToTraiflix';
import ReactContext from '../../ReactContext/ReactContext';
import { LoginSocialFacebook } from "reactjs-social-login";


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [trailRedirect, settraiRedirect]=useState(false)
  const [islogged, setislogged]  = useState(false)
  const {loggedCheck}  = useContext(ReactContext)

  const handleGoogleLogin = useGoogleLogin({
        onSuccess:credentialResponse => {
          console.log("Login Success", credentialResponse);
          Cookie.set("jwt_token", credentialResponse.credential);
          setEmail('');
          setPassword('');
          loggedCheck()
          settraiRedirect(true);
          // You can send credentialResponse.credential to your backend to verify
        },

        onError:() => {
          console.log('Login Failed');
        }
      });


   const handleFacebookLogin = (data) => {
    console.log("Facebook Login Success", data);
          Cookie.set("jwt_token", data.accessToken);

    setEmail('');
          setPassword('');
          loggedCheck()
          settraiRedirect(true);

   }

  


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage('Please fill all fields.'); 
      return;
    }

    try {
      const response = await fetch('https://movie-app-server-to5u.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.json();
      console.log(text);
      setMessage(text.message || text.error);
      if (response.ok) {
        Cookie.set("jwt_token", text.token);
        setPassword('');
        setEmail('');
        setislogged(true)
        loggedCheck()
        settraiRedirect(true);
      }
    } catch (err) {
      console.error(err);
      setMessage('Login failed. Please try again.');
    }
  };

  const registerPage = ()=>{
    navigate('/register')
  }
  useEffect(() => {
  if (trailRedirect) {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [trailRedirect, navigate]);

  if (trailRedirect){
    return <WelcomeToTraiflix/>
  }

  const jwtToken = Cookie.get("jwt_token")

  if(jwtToken){
    return <Navigate to = "/"  />

  }

  return (
    <div className="loginLoginDiv">
      <form className="loginLoginForm" onSubmit={handleLogin}>
        <h1 className="loginWelcomeHead">Welcome Back</h1>
        <p className="loginWelcomeDes">Sign in to continue your streaming experience</p>

        <div className="loginInputloginContainer">
          <label htmlFor="loginEmail" className="loginEmailLabel">Email</label>
          <div className="loginInputWrapper">
            <i className="fas fa-envelope loginIcon"></i>
            <input
              type="text"
              placeholder="Email"
              id="loginEmail"
              className="loginEmailInput"
               autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="loginInputContainer">
          <label htmlFor="loginPassword" className="loginPasswordLabel">Password</label>
          <div className="loginInputWrapper">
            <i className="fas fa-lock loginIcon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              id="loginPassword"
              className="loginPasswordInput"
               autoComplete="off"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <i
              className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
              onClick={() => setShowPassword(prev => !prev)}
              style={{ cursor: 'pointer', marginLeft: '8px' }}
            ></i>
          </div>
        </div>

       

        <button type="submit" className="loginCreateBtn" >Sign In</button>

        <p className="loginAlreadyPara">
          Don't have an account? <span className="loginAlreadySpan" onClick={registerPage}>Register here</span>
        </p>

        <div className="loginSocialDivider">
          <div className="loginLine"></div>
          <span className="loginOrText">Or continue with</span>
          <div className="loginLine"></div>
        </div>

        <div className="loginSocialButtons">

          <button type="button" className="loginSocialBtn" onClick={handleGoogleLogin}>
            <img
    src="https://developers.google.com/identity/images/g-logo.png"
    alt="Google"
style={{
      background: 'transparent',
      width: '18px',
      height: '18px',
      marginRight: '10px',
    }}  />
  Google</button>
          <LoginSocialFacebook
  appId="770459048981746"
  scope="" // keep this or set to "email,public_profile"
  onResolve={({ provider, data }) => handleFacebookLogin(data)}
  onReject={(err) => handleFacebookError(err)}
>
  <button type="button" className="loginSocialBtn">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png"
      alt="Facebook"
      style={{
        background: 'transparent',
        width: '18px',
        height: '18px',
        marginRight: '10px',
      }}
    />
    Facebook
  </button>
</LoginSocialFacebook>

        </div>

        <p style={{ color: '#ffb347', textAlign: 'center', minHeight: 24 }}>{message}</p>
      </form>
    </div>
  );
};

export default Login;
