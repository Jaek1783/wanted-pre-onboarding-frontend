import './App.css';
import {Routes, Route } from 'react-router-dom';
import SignUpPage from './components/sign-up';
import SignInPage from './components/sign-in';
import HomePage from './components/home';
import { useRef,useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import TodoList from './components/todo';
function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const idRef = useRef(null);
  const pwRef = useRef(null);
  const btnRef = useRef(null);
  const todoRef = useRef(null);
  const listRef = useRef([]);

  const server_url = 'http://localhost:8000';
  const navigate = useNavigate();
  const [list, setList] = useState([]);
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
      const response = await axios.post(`${server_url}/auth/signup`, data, {headers});
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
    const response = await axios.post(`${server_url}/auth/signin`,data,{headers});
    if(response.data.access_token){
      window.localStorage.setItem('jwt',response.data.access_token)
      navigate('/todo')
     }
  }
  const addList = async (e)=>{
    e.preventDefault();
    const desc = todoRef.current.value;
    if(desc === ''){
      alert('데이터를 입력해 주세요')
    }
    else{
      const accessToken = window.localStorage.getItem('jwt');
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      };
      const data = {
        todo: desc
      };
      const response = await axios.post(`${server_url}/todos`,data, {headers});
      if(response.status === 201){
        todoRef.current.value = '';
      }
    }
    try {
      const accessToken = window.localStorage.getItem('jwt');
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      }
      const response = await axios.get('http://localhost:8000/todos', { headers });
      setList(response.data);
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    }

  };
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
        <Route path="/todo" element={<TodoList
                                          todoRef={todoRef}
                                          addList={addList}
                                          list={list}
                                          setList={setList}
                                          listRef={listRef}
                                          />}/>
      </Routes>
    </div>
  );
}
export default App;
