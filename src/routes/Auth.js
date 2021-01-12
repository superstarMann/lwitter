/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { authService } from "fBase";
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);

    const onChange = (event) => {
        const {target: {name, value} }= event;
        if(name === "Email"){
            setEmail(value);
        }else if(name === "Password") {
            setPassword(value);
        }
        }

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
            const errorCode = error.code;
            console.log(errorCode)
            const errorMessage = error.message;
            console.log(errorMessage)
        }
    }

    return(
        <>
        <form onSubmit = {onSubmit}>
            <input onChange ={onChange} name ="Email" type = "text" placeholder ="Email" required value ={email}/>
            <input onChange ={onChange} name ="Password" type = "text" placeholder ="Password" required value ={password}/>
            <input type = "submit" value ={newAccount ? "Create Account" : "Log In"}/>
        </form>
        <>
        <button>Countinue with Google</button>
        <button>Countinue with Github</button>
        </>
     </>
    )
}

export default Auth;