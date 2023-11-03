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
                            Staff
                        </p>
                        <ul class="menu-list">
                            <li>
                                <Link to="/admin/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/tasks" class={`has-text-grey-light ${location.pathname.includes("task") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Tasks
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/clients" class={`has-text-grey-light ${location.pathname.includes("client") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/associates" class={`has-text-grey-light ${location.pathname.includes("associate") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faHardHat} />&nbsp;Associates
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/orders" class={`has-text-grey-light ${location.pathname.includes("order") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faWrench} />&nbsp;Work Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/skill-sets" class={`has-text-grey-light ${location.pathname.includes("skill-set") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faToolbox} />&nbsp;Skill Sets
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin/tags" class={`has-text-grey-light ${location.pathname.includes("tag") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTags} />&nbsp;Tags
                                </Link>
                            </li>

                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Administration
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a class="has-text-grey-light">
                                    <FontAwesomeIcon className="fas" icon={faCreditCard} />&nbsp;Financials
                                </a>
                                <a class="has-text-grey-light">
                                    <FontAwesomeIcon className="fas" icon={faChartBar} />&nbsp;Reports
                                </a>
                                <a class="has-text-grey-light">
                                    <FontAwesomeIcon className="fas" icon={faUserTie} />&nbsp;Staff
                                </a>
                                <a class="has-text-grey-light">
                                    <FontAwesomeIcon className="fas" icon={faCogs} />&nbsp;Org. Settings
                                </a>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <Link to="/admin/help" class={`has-text-grey-light ${location.pathname.includes("help") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faQuestionCircle} />&nbsp;Help
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" class={`has-text-grey-light ${location.pathname.includes("profile") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUser} />&nbsp;My Profile
                                </Link>
                            </li>
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
                            Staff
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/dashboard" class={`has-text-grey-light ${location.pathname.includes("dashboard") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Dashboard
                                </a>
                            </li>

                            <li>
                                <a href="/clients" class={`has-text-grey-light ${location.pathname.includes("client") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUsers} />&nbsp;Client
                                </a>
                            </li>
                            <li>
                                <a href="/submissions" class={`has-text-grey-light ${(location.pathname.includes("submissions") && !location.pathname.includes("comic") && !location.pathname.includes("card")) && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faTasks} />&nbsp;Submissions
                                </a>
                                <ul>
                                    <li>
                                        <a href="/submissions/comics" class={`has-text-grey-light ${location.pathname.includes("submissions/comic") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faBook} />&nbsp;Comics
                                        </a>
                                    </li>
                                    {/*
                                    <li>
                                        <a href="/submissions/cards" class={`has-text-grey-light ${location.pathname.includes("card") && "is-active"}`}>
                                            <FontAwesomeIcon className="fas" icon={faTachometer} />&nbsp;Cards
                                        </a>
                                    </li>
                                    */}
                                </ul>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            System
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href="/registry" class={`has-text-grey-light ${location.pathname.includes("registry") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBarcode} />&nbsp;Registry
                                </a>
                            </li>
                        </ul>

                        <p class="menu-label has-text-grey-light">
                            Account
                        </p>
                        <ul class="menu-list">
                            <li>
                                <a href={`/account`} class={`has-text-grey-light ${location.pathname.includes("account") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Account
                                </a>
                            </li>
                            <li>
                                <a href={`/organization`} class={`has-text-grey-light ${location.pathname.includes("organization") && "is-active"}`}>
                                    <FontAwesomeIcon className="fas" icon={faBuilding} />&nbsp;Organization
                                </a>
                            </li>
                            <li>
                                <a onClick={(e)=>setShowLogoutWarning(true)} class={`has-text-grey-light ${location.pathname.includes("logout") && "is-active"}`} >
                                    <FontAwesomeIcon className="fas" icon={faSignOut} />&nbsp;Sign Off
                                </a>
                            </li>
                        </ul>
                    </aside>
                </div>
            }
        </>
    );
}
