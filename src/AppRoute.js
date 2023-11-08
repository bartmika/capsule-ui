import { React, useState } from "react";
import 'bulma/css/bulma.min.css';
import './index.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { RecoilRoot } from 'recoil';

import FirstDetail from "./Components/Page/DetailView/First/Detail";
import SecondList from "./Components/Page/ListView/Second/List";
import FirstList from "./Components/Page/ListView/First/List";
import DashboardLaunchpad from "./Components/Page/Dashboard/Launchpad";
import LogoutRedirector from "./Components/Gateway/LogoutRedirector";
import Login from "./Components/Gateway/Login";
import Index from "./Components/Gateway/Index";
import TopAlertBanner from "./Components/Misc/TopAlertBanner";
import Sidebar from "./Components/Menu/Sidebar";
import Topbar from "./Components/Menu/Top";
import NotFoundError from "./Components/Misc/NotFoundError";
import NotImplementedError from "./Components/Misc/NotImplementedError";
import ForgotPassword from "./Components/Gateway/ForgotPassword";
import PasswordReset from "./Components/Gateway/PasswordReset";


function AppRoute() {
    return (
        <div class="is-widescreen is-size-5-desktop is-size-6-tablet is-size-7-mobile">
            {/*
                NOTES FOR ABOVE
                USE THE FOLLOWING TEXT SIZES BASED ON DEVICE TYPE
                - is-size-5-desktop
                - is-size-6-tablet
                - is-size-7-mobile
            */}
            <RecoilRoot>
                <Router>
                    <TopAlertBanner />
                    <Topbar />
                    <div class="columns">
                        <Sidebar />
                        <div class="column">
                            <section class="main-content columns is-fullheight">
                                <Routes>
                                    {/* Pages. */}
                                    <Route exact path="/page/detail/first/:id" element={<FirstDetail/>}/>
                                    <Route exact path="/page/list/second" element={<SecondList/>}/>
                                    <Route exact path="/page/list/first" element={<FirstList/>}/>
                                    <Route exact path="/page/launchpad" element={<DashboardLaunchpad/>}/>
                                    {/* Gateway related pages. */}
                                    <Route exact path="/login" element={<Login/>}/>
                                    <Route exact path="/logout" element={<LogoutRedirector/>}/>
                                    <Route exact path="/forgot-password" element={<ForgotPassword/>}/>
                                    <Route exact path="/password-reset" element={<PasswordReset/>}/>
                                    <Route exact path="/501" element={<NotImplementedError/>}/>
                                    <Route exact path="/" element={<Index/>}/>
                                    <Route path="*" element={<NotFoundError/>}/>
                                </Routes>
                            </section>
                            <div>
                                {/* DEVELOPERS NOTE: Mobile tab-bar menu can go here */}
                            </div>
                            <footer class="footer is-hidden">
                                <div class="container">
                                    <div class="content has-text-centered">
                                        <p>Hello</p>
                                    </div>
                                </div>
                            </footer>
                        </div>
                    </div>
                </Router>
            </RecoilRoot>
        </div>
    );
}

export default AppRoute;
