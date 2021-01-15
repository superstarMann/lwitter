/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {target: {name, value} }= event;
        if(name === "Email"){
            setEmail(value);
        }else if(name === "Password") {
            setPassword(value);
        }
        };

    const onSubmit = async(event) => {
        event.preventDefault();
        try{
            let data;
            if(newAccount){
             data = await authService.createUserWithEmailAndPassword(email, password);
            }else if(!newAccount){
             data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    const OnSocial = async (event) => {
        const {target : {name}} = event;
        let provider;
        if(name === "Google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }else if(name === "Git hub"){
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }

    return(
        <>
        <form onSubmit = {onSubmit}>
            <input onChange ={onChange} name ="Email" type = "email" placeholder ="Email" required value ={email}/>
            <input onChange ={onChange} name ="Password" type = "password" placeholder ="Password" required value ={password}/>
            <input type ="submit" value ={newAccount ? "Create Account" : "Sign In"} />
        </form>
        {error}
        <span onClick={toggleAccount}>{newAccount ? "Sign In" : "Create Account"}</span>
        <div>
        <button name= "Google" onClick ={OnSocial}>Countinue with Google</button>
        <button name= "Git hub" onClick ={OnSocial}>Countinue with Github</button>
        </div>
     </>
    )
}

export default Auth;