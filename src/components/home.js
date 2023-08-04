import React from "react";

import { Link } from "react-router-dom";
const HomePage = ()=>{
    return <div className="btnContainer">
        <button>
            <Link to="/signup">회원가입</Link>
        </button>
        <button>
            <Link to="/signin">로그인</Link>
        </button>
    </div>
};
export default HomePage;