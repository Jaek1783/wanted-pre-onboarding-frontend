import React from "react";
const SignUpPage = ({emailRef, passwordRef, btnRef, checkForm, isButtonDisubled, handleSubmit})=>{
    return <div>
        <h1>회원가입</h1>
        <hr/>
        <div>
            <form>
                <label htmlFor="">
                    <input type="email" onChange={checkForm} data-testid="email-input" ref={emailRef} required placeholder="@를 꼭 붙여주세요"/>
                </label>
                <label htmlFor="">
                    <input type='password' onChange={checkForm} data-testid="password-input" ref={passwordRef} required placeholder="8자 이상 적어주세요"/>
                </label>
                <button data-testid="signup-button" onClick={handleSubmit} ref={btnRef} disabled={isButtonDisubled}>회원가입</button>
            </form>
        </div>
    </div>
};
export default SignUpPage;