import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from "fBase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const HomeFactory = ({userObj}) => {
    const [Hwitter, setHwitter] = useState("")
    const [FileName, setFileName] = useState("");
    const onSubmit = async event => {
        if (Hwitter === "") {
            return;
          }
        event.preventDefault();
        let fileUrl ="";
        if(FileName !=="" ){
         const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
         const response = await fileRef.putString(FileName, "data_url");
         fileUrl = await response.ref.getDownloadURL();
        }
        const HwitterObj = {
         text: Hwitter,
         createdAt: Date.now(),
         creatorId: userObj.uid,
         fileUrl
        }
        await dbService.collection("hwitters").add(HwitterObj);
       setHwitter("");
       setFileName("");      
     };
     const onChange = event => {
         const {target : { value }} = event;
         setHwitter(value);
     }
     const onFileChange = event => {
         const {target : {files} } = event;
         const theFile = files[0];
         const reader = new FileReader();
         reader.onloadend = (finishedEvent) => {
            const {currentTarget : {result}} = finishedEvent;
            setFileName(result);
         }
         reader.readAsDataURL(theFile);
     }
     const onClearFile = () => {setFileName("");}
    return(
        <form onSubmit= {onSubmit} className="factoryForm">
         <div className="factoryInput__container">
            <input type = "text" placeholder = "what is your mind?" onChange={onChange} maxLength={240} value ={Hwitter} className="factoryInput__input"/>
            <input type ="submit" value ="Post" className="factoryInput__arrow" />
         </div>
         <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
         <input type = "file" accept="image/*"  onChange={onFileChange} id="attach-file" style={{opacity: 0}}/>
            {FileName && (
            <div className="factoryForm__attachment">
            <img src = {FileName} style={{backgroundImage: FileName}}/>
            <div className="factoryForm__clear" onClick ={onClearFile}>
                <span>Remove</span>
                <FontAwesomeIcon icon={faTimes} />
            </div>
            </div>
            )}
        </form>
    )
}

export default HomeFactory;