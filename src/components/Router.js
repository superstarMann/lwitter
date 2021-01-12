/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import EditProfile from "../routes/EditProfile";
import Profile from "../routes/Profile";

const AppRouter = ({isLoggedIn}) => {
    return(
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path ="/">
                        <Home/>
                    </Route>
                    <Route>
                        <EditProfile/>
                    </Route>
                    <Route>
                        <Profile/>
                    </Route>
                    </>
                ) : (
                    <Route exact path ="/">
                        <Auth/>
                    </Route>
                )}
            </Switch>
        </Router>
    );
};

export default AppRouter