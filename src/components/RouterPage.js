import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AdminDashboard from "./AdminDashboard";
import Home from "./Home";
import MyProfile from "./MyProfile";
import Staff from "./Staff";
import StaffDashboard from "./StaffDashboard";
import StaffLogin from "./StaffLogin";
import StaffUpdate from "./StaffUpdate";

export default function RouterPage()
{
    return(
            <Router>
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/staff" exact component={Staff}/>
                    <Route path="/staffupdate/:id" exact component={StaffUpdate}/>
                    <Route path="/stafflogin" exact component={StaffLogin}/>
                    <Route path="/admindashboard" exact component={AdminDashboard}/>
                    <Route path="/staffdashboard" exact component={StaffDashboard}/>
                    <Route path="/profile" exact component={MyProfile}/>
                </Switch>
            </Router>
    )
}