/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React from "react";
import { authService } from "fBase";
import { useHistory } from "react-router-dom";

const EditProfile = () => {
    const history = useHistory();
    const ClickLogOut = () => {
        authService.signOut();
        history.push("/");
    }

    return(
        <>
        <button onClick = {ClickLogOut}>Log Out</button>
        </>
    )
}

export default EditProfile;