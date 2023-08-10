import React from "react";
import styles from './sign.module.css'
const SignUpPage = ({emailRef, passwordRef, btnRef, checkForm, isButtonDisubled, handleSubmit})=>{
    return <div className={styles.container}>
        <h1>회원가입</h1>
            <form>
                <label>
                    <span>Email</span>
                    <input type="email" onChange={checkForm} data-testid="email-input" ref={emailRef} required placeholder="@를 꼭 붙여주세요"/>
                </label>
                <label>
                    <span>PW</span>
                    <input type='password' onChange={checkForm} data-testid="password-input" ref={passwordRef} required placeholder="8자 이상 적어주세요"/>
                </label>
                <button data-testid="signup-button" onClick={handleSubmit} ref={btnRef} disabled={isButtonDisubled}>회원가입</button>
            </form>
        </div>
};
export default SignUpPage;