import React from "react";
import { Link,useNavigate} from "react-router-dom";
const HomePage = ()=>{
    const navigate = useNavigate();
    const checkToken = (e)=>{
        e.preventDefault();
        const accessToken = window.localStorage.getItem('jwt');
        if(accessToken ===('')){
            navigate('/signup')
        }
        else{
            navigate('/todo')
        }
    };
    return <div className="btnContainer">
        <button>
            <Link to="/signup">회원가입</Link>
        </button>
        <button onClick={checkToken}>
            로그인
        </button>
    </div>
};
export default HomePage;