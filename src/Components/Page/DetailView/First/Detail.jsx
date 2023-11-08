import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faFilterCircleXmark,faArrowLeft, faUserCircle, faTachometer,
    faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable,
    faArrowUpRightFromSquare, faRefresh, faFilter, faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getClientDetailAPI } from "../../../../API/Client";
import {
    topAlertMessageState,
    topAlertStatusState,
    currentUserState,
    clientFilterStatusState,
    clientFilterTypeState,
    clientFilterSortState
} from "../../../../AppState";
import ErrorBox from "../../../Reusable/EveryPage/ErrorBox";
import AlertBanner from "../../../Reusable/EveryPage/AlertBanner";
import PageLoadingContent from "../../../Reusable/EveryPage/PageLoadingContent";
import FormInputFieldWithButton from  "../../../Reusable/FormInputFieldWithButton";
import FormSelectField from  "../../../Reusable/FormSelectField";
import FormDateField from "../../../Reusable/FormDateField";
import BubbleLink from "../../../Reusable/EveryPage/BubbleLink";
import { USER_ROLES,
    USER_STATUS_LIST_OPTIONS,
    USER_ROLE_LIST_OPTIONS,
    CLIENT_SORT_OPTIONS,
    CLIENT_STATUS_FILTER_OPTIONS,
    CLIENT_TYPE_OF_FILTER_OPTIONS
} from "../../../../Constants/FieldOptions";
import {
    DEFAULT_CLIENT_LIST_SORT_BY_VALUE,
    DEFAULT_CLIENT_STATUS_FILTER_OPTION
} from "../../../../Constants/App";


function FirstDetail() {

    ////
    //// URL Parameters.
    ////

    const { id } = useParams()

    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [client, setClient] = useState({});
    const [tabIndex, setTabIndex] = useState(1);

    ////
    //// Event handling.
    ////

    //

    ////
    //// API.
    ////

    function onSuccess(response){
        console.log("onSuccess: Starting...");
        console.log("onSuccess: response:", response);
        setClient(response);
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onDone() {
        console.log("onDone: Starting...");
        setFetching(false);
    }

    const onUnauthorized = () => {
        setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    }

    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            window.scrollTo(0, 0);  // Start the page at the top of the page.

            setFetching(true);
            getClientDetailAPI(
                id,
                onSuccess,
                onError,
                onDone,
                onUnauthorized
            );
        }

        return () => { mounted = false; }
    }, [id]);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    return (
        <>
            <div class="container">
                <section class="section">
                    {/* Desktop Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/page/launchpad" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/page/list/first" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/page/list/first" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link></li>
                        </ul>
                    </nav>

                    {/* Page banner */}
                    {client && client.status === 2 && <AlertBanner message="Archived" status="info" />}

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faEye} />&nbsp;Detail</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        {client && <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Detail</p>
                            </div>
                            <div class="column has-text-right">
                                <Link to={`/page/client/${id}/edit`} class="button is-small is-warning is-fullwidth-mobile" type="button" disabled={client.status === 2}>
                                    <FontAwesomeIcon className="mdi" icon={faPencil} />&nbsp;Edit
                                </Link>
                            </div>
                        </div>}

                        {/* <p class="pb-4">Please fill out all the required fields before submitting this form.</p> */}

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <ErrorBox errors={errors} />

                                {client && <div class="container">

                                    {/* Tab Navigation */}
                                    <div class= "tabs is-medium is-size-7-mobile">
                                        <ul>
                                            <li>
                                                <Link to={`/501`}>Summary</Link>
                                            </li>
                                            <li class="is-active">
                                                <Link><strong>Detail</strong></Link>
                                            </li>
                                            <li>
                                                <Link to={`/501`}>Orders</Link>
                                            </li>
                                            <li>
                                                <Link to={`/501`}>Comments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/501`}>Attachments</Link>
                                            </li>
                                            <li>
                                                <Link to={`/501`}>More&nbsp;&nbsp;<FontAwesomeIcon className="mdi" icon={faEllipsis} /></Link>
                                            </li>
                                        </ul>
                                    </div>

                                    {/*
                                        ##########################
                                        Peronsal Information Table
                                        ##########################
                                    */}
                                    <table class="table is-fullwidth">
                                        <thead>
                                            <tr class="has-background-black">
                                                <th class="has-text-white" colSpan="2">
                                                    Personal Information
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th class="has-background-light" style={{width: "30%"}}>First Name:</th>
                                                <td>{client.firstName}</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/page/list/first`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <Link to={`/page/client/${id}/edit`} class="button is-warning is-fullwidth-mobile" disabled={client.status === 2}><FontAwesomeIcon className="fas" icon={faPencil} />&nbsp;Edit</Link>
                                        </div>
                                    </div>

                                </div>}
                            </>
                        }
                    </nav>
                </section>
            </div>
        </>
    );
}

export default FirstDetail;
