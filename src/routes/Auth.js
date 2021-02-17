/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { authService, firebaseInstance } from "fBase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faTwitter, faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";

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
        <div className="authContainer">
        <form onSubmit = {onSubmit} className="container">
             <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="3x" style={{ margin:"auto" , marginBottom: 30 }}/>
            <input onChange ={onChange} name ="Email" type = "email" placeholder ="Email" required value ={email} className="authInput"/>
            <input onChange ={onChange} name ="Password" type = "password" placeholder ="Password" required value ={password} className="authInput"/>
            <input type ="submit" className="authInput authSubmit" value ={newAccount ? "Create Account" : "Sign In"}  />
        </form>
        {error && <span className="authError">{error}</span>}
        <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign In" : "Create Account"}</span>
        <div className="authBtns">
        <button name= "Google" onClick ={OnSocial} className="authBtn">Countinue with Google <FontAwesomeIcon icon={faGoogle} /></button>
        <button name= "Git hub" onClick ={OnSocial} className="authBtn">Countinue with Github <FontAwesomeIcon icon={faGithub} /></button>
        </div>
     </div>
    )
}

export default Auth;