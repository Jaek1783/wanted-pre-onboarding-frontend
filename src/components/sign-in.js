import React from "react";
const SignInPage = ({idRef, pwRef, handleSignin})=>{
    return <div>
        <h1>로그인</h1>
        <form>
                <label htmlFor="">ID
                    <input type="email"  data-testid="email-input" ref={idRef}/>
                </label>
                <label htmlFor="">PW
                    <input type='password' data-testid="password-input" ref={pwRef}/>
                </label>
                <button data-testid="signin-button" onClick={handleSignin}>로그인</button>
            </form>
    </div>
};
export default SignInPage;