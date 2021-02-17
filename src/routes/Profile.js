/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React, { useEffect, useState } from "react";
import { authService, dbService } from "fBase";
import { useHistory } from "react-router-dom";

const EditProfile = ({userObj}) => {
    const [newUserName , setnewUserName] = useState(userObj.displayName);
    const history = useHistory();
    const ClickLogOut = () => {
        authService.signOut();
        history.push("/");
    }

    const getMyNweets = async () => {
        const hweets = await dbService
          .collection("hwitters")
          .where("creatorId", "==", userObj.uid)
          .orderBy("createdAt", "desc")
          .get();
        console.log(hweets.docs.map((doc) => doc.data()));
      };
    
      useEffect(() => {
        getMyNweets();
      }, []);

      const onChange = (event) => {
          const {target : {value}} =event;
          setnewUserName(value);
      }

      const onSubmit = async (event) => {
          event.preventDefault();
          if(userObj.displayName !== newUserName){
              await userObj.updateProfile({
                  displayName: newUserName
              })
          }
      }

    return(
        <div className ="container">
        <form onSubmit ={onSubmit} className="profileForm"> 
            <input type ="text" onChange ={onChange} placeholder ="Edit Name" value = {newUserName} autoFocus className="formInput"/>
            <input type ="submit" value ="Update Name" className="formBtn" style={{marginTop: 10}}/>
        </form>
        <span className="formBtn cancelBtn logOut" onClick = {ClickLogOut}>Log Out</span>
        </div>
    )
}

export default EditProfile;