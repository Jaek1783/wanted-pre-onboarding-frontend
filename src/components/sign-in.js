import React from "react";
import styles from './sign.module.css'
const SignInPage = ({idRef, pwRef, handleSignin})=>{
    return <div className={styles.container}>
        <h1>로그인</h1>
        <form>
                <label>
                    <span>ID</span>
                    <input type="email"  data-testid="email-input" ref={idRef}/>
                </label>
                <label>
                    <span>PW</span>
                    <input type='password' data-testid="password-input" ref={pwRef}/>
                </label>
                <button data-testid="signin-button" onClick={handleSignin}>로그인</button>
            </form>
    </div>
};
export default SignInPage;