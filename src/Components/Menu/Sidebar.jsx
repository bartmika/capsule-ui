import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHardHat, faUser, faQuestionCircle, faCogs, faUserTie, faChartBar, faCreditCard, faTags, faToolbox, faWrench, faBars, faBook, faRightFromBracket, faTachometer, faTasks, faSignOut, faUserCircle, faUsers, faBuilding, faBarcode } from '@fortawesome/free-solid-svg-icons'
import { useRecoilState } from 'recoil';

import { onHamburgerClickedState, currentUserState } from "../../AppState";
import { EXECUTIVE_ROLE_ID, MANAGEMENT_ROLE_ID, FRONTLINE_ROLE_ID, ASSOCIATE_ROLE_ID, CUSTOMER_ROLE_ID } from "../../Constants/App";


export default props => {
    ////
    //// Global State
    ////

    const [onHamburgerClicked ] = useRecoilState(onHamburgerClickedState);
    const [currentUser] = useRecoilState(currentUserState);

    ////
    //// Local State
    ////

    const [showLogoutWarning, setShowLogoutWarning] = useState(false);

    ////
    //// Events
    ////

    // Do nothing.

    ////
    //// Rendering.
    ////

    //-------------//
    // CASE 1 OF 3 //
    //-------------//

    // Get the current location and if we are at specific URL paths then we
    // will not render this component.
    const ignorePathsArr = [
        "/",
        "/register",
        "/register-successful",
        "/index",
        "/login",
        "/logout",
        "/verify",
        "/forgot-password",
        "/password-reset",
        "/root/dashboard",
        "/root/tenants",
        "/root/tenant"
    ];
    const location = useLocation();
    var arrayLength = ignorePathsArr.length;
    for (var i = 0; i < arrayLength; i++) {
        // console.log(location.pathname, "===", ignorePathsArr[i], " EQUALS ", location.pathname === ignorePathsArr[i]);
        if (location.pathname === ignorePathsArr[i]) {
            return (null);
        }
    }

    //-------------//
    // CASE 2 OF 3 //
    //-------------//

    if (currentUser === null) {
        return (null);
    }

    //-------------//
    // CASE 3 OF 3 //
    //-------------//

    return (
        <>
            <div class={`modal ${showLogoutWarning ? 'is-active' : ''}`}>
                <div class="modal-background"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Are you sure?</p>
                        <button class="delete" aria-label="close" onClick={(e)=>setShowLogoutWarning(false)}></button>
                    </header>
                    <section class="modal-card-body">
                        You are about to log out of the system and you'll need to log in again next time. Are you sure you want to continue?
                    </section>
                    <footer class="modal-card-foot">
                        <Link class="button is-success" to={`/logout`}>Yes</Link>
                        <button class="button" onClick={(e)=>setShowLogoutWarning(false)}>No</button>
                    </footer>
                </div>
            </div>
            {/*
                -----
                STAFF
                -----
            */}
            {(currentUser.role === EXECUTIVE_ROLE_ID || currentUser.role === MANAGEMENT_ROLE_ID)  &&
                <div className={`column is-one-fifth has-background-black ${onHamburgerClicked ? '' : 'is-hidden'}`}>
                    <nav class="level is-hidden-mobile">
                        <div class="level-item has-text-centered">
                            <figure class='image'>
                                <img src='/img/compressed-logo.png' style={{maxWidth:"200px"}} />
                            </figure>
                        </div>
                    </nav>
                    <aside class="menu p-4">
                        <p class="menu-label has-text-grey-light">
                            Pages
                        </p>
                        <ul class="menu-list">
                            <li>
                                <Link to="/admin/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </Link>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
            {/*
                --------
                RETAILER
                --------
            */}
            {currentUser.role === 2 &&
                <>
                    {/* You can load up distinct side bar menu items based on this user's role. */}
                    {/* Write your code here ... */}
                </>
            }
        </>
    );
}
