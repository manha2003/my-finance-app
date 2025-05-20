import React , {useState, useEffect} from 'react'
import './LoginSignup.css'
import axios from 'axios';
import user_icon from '../../components/assets/person.png'
import email_icon from '../../components/assets/email.png'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import password_icon from '../../components/assets/password.png'
import Loader from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { tokens } from "../../theme";
import {useTheme } from "@mui/material";


const LoginSignup = ({ setIsAuthenticated }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [action, setAction] = useState("Login");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
 
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
      setUsername("");
      setEmail("");
      setPassword("");
     
    }, [action]);

    const handleSubmit = async () => {
      const delay = new Promise(resolve => setTimeout(resolve, 2000)); 
     
      
     
      
      try {
        if (action === "Login") {
          const loginDto = { UserName: username, Password: password };
          const response = await axios.post('https://localhost:7142/api/Auth/Login', loginDto, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status === 200) {
            setLoading(true); 
            const token = response.data;
            await delay;
            if (token) {
              localStorage.setItem('authToken', token);
              setIsAuthenticated(true);
              navigate('/');
            }
          }
        } else if (action === "Sign Up") {
          const registerDto = { UserName: username, Email: email, Password: password };
          const response = await axios.post('https://localhost:7142/api/Users/Register', registerDto, {
            headers: { 'Content-Type': 'application/json' },
          });

          if (response.status === 200) {
            toast.success(response.data);
            setAction("Login");
          }
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data);
        } else {
          toast.error("An error occurred. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    };


    if (loading) {
      return <Loader />; 
    }


    return (
      <div className="background-wrapper">
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        transition={Bounce}
      />
        <div className='container'>
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
    
          <div className="inputs">
            <div className="input">
              <img src={user_icon} alt="user icon" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
    
            {action === "Sign Up" && (
              <div className="input">
                <img src={email_icon} alt="email icon" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            )}
    
            <div className="input">
              <img src={password_icon} alt="password icon" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
    
            
          </div>
    
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => setAction("Sign Up")}
            >
              Sign Up
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={() => setAction("Login")}
            >
              Login
            </div>
            
          </div>

          <div
              className="submit"
              onClick={handleSubmit}
              style={{  margin: '0 auto',}}
            >
              {action}
            </div>
    
        
        </div>
      </div>
    );
  };
  
  export default LoginSignup;