import React, { useState } from "react";
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
        { editing ? (
            <>
            <form onSubmit ={onSubmit} className="container nweetEdit">
            <input onChange ={onChange} type="text" placeholder={userObj.text} value ={newText} required autoFocus className="formInput"/>
            <input type ="submit" value ="Update Text" className= "formBtn"/>
            </form>
            <span onClick={toggleEditing} className="formBtn cancelBtn">Cancel</span>
            </>
        ) : (     
    <div>
    {userObj.fileUrl && <img src={userObj.fileUrl}/>}
    <h4>{userObj.text}</h4>
    {isOwner && (
        <div class="nweet__actions">
        <span onClick={DeleteButton}><FontAwesomeIcon icon={faTrash} /></span>
        <span onClick={toggleEditing}><FontAwesomeIcon icon={faPencilAlt} /></span>
       </div>
    )}
   </div>
        )}
        </div>
    )
};

export default HwitterText;