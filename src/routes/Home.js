/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { dbService, storageService } from "fBase";
import React, { useEffect, useState } from "react";
import HwitterText from "../components/HwitterText";
import {v4 as uuidv4} from "uuid";

const Home = ({userObj}) => {
    const [Hwitter, setHwitter] = useState("")
    const [Hwitters, setHwitters] = useState([]);
    const [FileName, setFileName] = useState("");
    useEffect(() => {
        dbService.collection("hwitters").onSnapshot((snapshot) => {
            const hwitterArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setHwitters(hwitterArray);
          });
        }, []);

    const onSubmit = async event => {
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
    const onClearFile = () => {
        setFileName(null);
    }
    return(
        <div>
        <form onSubmit= {onSubmit}>
            <input type = "text" placeholder = "what is your mind?" onChange={onChange} maxLength={240} value ={Hwitter}/>
            <input type = "file" accept="image/*"  onChange={onFileChange}/>
            <input type ="submit" value ="Post"/>
            {FileName && (
            <div>
            <img src = {FileName} width ="50px" height= "50px"/>
            <button onClick ={onClearFile}>Clear</button>
            </div>
            )}
        </form>
        <div>
            {Hwitters.map((Hwitter) => (
                <HwitterText key ={Hwitter.id} userObj ={Hwitter} isOwner ={Hwitter.creatorId === userObj.uid}/>
            ))}
        </div>
        </div>
    )
}
export default Home;