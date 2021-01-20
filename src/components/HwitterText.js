import React, { useState } from "react";
import { dbService, storageService } from "fBase";

const HwitterText = ({userObj, isOwner}) =>{
    const [editing, setEditing] = useState(false);
    const [newText, setNewText] = useState(userObj.text)
    const DeleteButton = async() => {
    const ok = window.confirm("Are you Sure?");
    if(ok){
       await dbService.doc(`hwitters/${userObj.id}`).delete();
       await storageService.refFromURL(userObj.fileUrl).delete();
    }
};
const toggleEditing = () => setEditing((prev) => !prev)
const onSubmit = async (e) => {
    e.preventDefault();
    await dbService.doc(`hwitters/${userObj.id}`).update({
        text: newText
    })
    setEditing(false);
};
const onChange = (e) => {
    const {target : {value}} = e;
    setNewText(value);
}
    return(
        <>
        { editing ? (
            <>
            <form onSubmit ={onSubmit}>
            <input onChange ={onChange} type="text" placeholder={userObj.text} value ={newText} required/>
            <input type ="submit" value ="Update Text"/>
            </form>
            <button onClick = {toggleEditing}>Cancel</button>
            </>
        ) : (     
    <div>
    {userObj.fileUrl && (<img src={userObj.fileUrl} width ="50px" height = "50px"/>)}
    <h4>{userObj.text}</h4>
    {isOwner && (
        <>
        <button onClick={DeleteButton}>Delete</button>
        <button onClick={toggleEditing}>Edit</button>
       </>
    )}
   </div>
        )}
        </>
    )
}

export default HwitterText;