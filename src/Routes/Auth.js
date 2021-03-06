import React, { useState } from 'react';
import { authService, firebaseInstance } from 'fBase';

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true)
    const [error, setError] = useState("")

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        }
    }

    const onSubmit = async(event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await authService.createUserWithEmailAndPassword(
                    email, password
                )
            } else if (newAccount === false) {
                await authService.signInWithEmailAndPassword(
                    email, password
                )
            }
        } catch(error) {
            setError(error.message)
        }
    }

    const toggleAccount = () => setNewAccount(prev => !prev)
    const onSocialClick = async (event) =>{
        const { target: { name } } = event;
    
        let provider
        if (name === "google") {
                provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === "github") {
                provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider)
    }

    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="text" 
                    placeholder="Email" 
                    required 
                    value={email} 
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required 
                    value={password} 
                    onChange={onChange}
                />
                <input 
                    type="submit" 
                    value={newAccount ? "Create Account" : "Log In"}
                />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
            <div>
                <button onClick={onSocialClick} name="google" >Countinue With Google.</button>
                <button onClick={onSocialClick} name="github" >Countinue With Github.</button>
            </div>
        </div>
    )
}
export default Auth