/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import { dbService } from "fBase";
import React, { useEffect, useState } from "react";
import HwitterText from "../components/HwitterText";

const Home = ({userObj}) => {
    const [Hwitter, setHwitter] = useState("")
    const [Hwitters, setHwitters] = useState([]);
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
       await dbService.collection("hwitters").add({
        text: Hwitter,
        createdAt: Date.now(),
        creatorId: userObj.uid,
      });
      setHwitter("");
    };
    const onChange = event => {
        const {target : { value }} = event;
        setHwitter(value);
    }
    return(
        <div>
        <form onSubmit= {onSubmit}>
            <input type = "text" placeholder = "what is your mind?" onChange={onChange} maxLength={240} value ={Hwitter}/>
            <input type = "submit" value ="Post"/>
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