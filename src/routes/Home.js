/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React, { useEffect, useState } from "react";
import { dbService } from "fBase";
import HwitterText from "../components/HwitterText";
import HomeFactory from "components/HomeFactory";

const Home = ({userObj}) => {
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

    return(
        <div className ="container">
         <HomeFactory userObj ={userObj}/>
        <div style={{marginTop: 30}}>
            {Hwitters.map((Hwitter) => (
                <HwitterText key ={Hwitter.id} userObj ={Hwitter} isOwner ={Hwitter.creatorId === userObj.uid}/>
            ))}
        </div>
        </div>
    )
}
export default Home;