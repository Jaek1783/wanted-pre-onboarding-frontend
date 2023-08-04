import './App.css';
import {Routes, Route } from 'react-router-dom';
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import HomePage from './components/home';
import { useRef,useState} from 'react';
function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const btnRef = useRef(null);
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
  const handleSubmit = (e) => {
    e.preventDefault();
      const emailValue = emailRef.current.value.trim();
      const passwordValue = passwordRef.current.value.trim();
      console.log(emailValue, passwordValue)
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
        <Route path="/signin" element={<SignInPage />} />
      </Routes>
    </div>
  );
}
export default App;
