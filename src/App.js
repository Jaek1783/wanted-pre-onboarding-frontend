import './App.css';
import {Routes, Route } from 'react-router-dom';
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import HomePage from './components/home';
import { useRef,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  
  const checkForm = ()=>{
        const emailValue = emailRef.current.value;
        const passwordValue = passwordRef.current.value;
        if(emailValue.includes('@')){
          if(passwordValue.length < 8){
            setIsButtonDisabled(true)
          }
          else{
            setIsButtonDisabled(false)
          }
        }
        else{
          setIsButtonDisabled(true)
        }
      }
  const handleSubmit = async (e) => {
    e.preventDefault();
      const email = emailRef.current.value.trim();
      const password = passwordRef.current.value.trim();
      const data = {email:email, password:password};
      const headers = {'Content-Type':'application/json'};
     const response = await axios.post("http://localhost:8000/auth/signup", data, {headers});
    // const response = await axios.get('http://localhost:8000/auth/signup');
     console.log(response.data)
     if(response.status === 201){
      alert('축하합니다. 회원가입이 완료되었습니다');
      emailRef.current.value='';
      passwordRef.current.value='';
      navigate('/signin')
     }
    }

  const handleSignin = async (e)=>{
    e.preventDefault();
    const id = idRef.current.value;
    const pw = pwRef.current.value;
    const data = {email:id, password:pw};
    const headers = {'Content-type': 'application/json'}
    const response = await axios.post('http://localhost:8000/auth/signin',data,{headers});
    if(response.data.access_token){
      window.localStorage.setItem('jwt',response.data.access_token)
      navigate('/')
     }

  }
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage 
                                          emailRef={emailRef} 
                                          passwordRef={passwordRef} 
                                          checkForm={checkForm}
                                          btnRef={btnRef}
                                          isButtonDisubled={isButtonDisabled}
                                          handleSubmit={handleSubmit}
                                          />} />
        <Route path="/signin" element={<SignInPage 
                                          idRef={idRef}
                                          pwRef={pwRef}
                                          handleSignin={handleSignin}
                                          />} />
      </Routes>
    </div>
  );
}
export default App;
