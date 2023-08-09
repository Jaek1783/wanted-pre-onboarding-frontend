import React from "react";
import { Link} from "react-router-dom";
import styles from './home.module.css';
const HomePage = ()=>{
    const accessToken = window.localStorage.getItem('jwt');
    return <div className={styles.btnContainer}>
        <Link to={accessToken ? `/todo`:`/signup`}>회원가입</Link>
        <Link to={accessToken ? `/todo`:`/signin`}>로그인</Link>
    </div>
};
export default HomePage;