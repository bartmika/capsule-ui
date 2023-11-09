import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faEllipsis, faFilterCircleXmark,faArrowLeft, faUserCircle, faTachometer,
    faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable,
    faArrowUpRightFromSquare, faRefresh, faFilter, faSearch, faCircleCheck
} from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { postClientCreateAPI} from "../../../../API/Client";
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
import FormInputField from  "../../../Reusable/FormInputField";
import FormSelectField from  "../../../Reusable/FormSelectField";
import FormDateField from "../../../Reusable/FormDateField";
import DateTextFormatter from "../../../Reusable/EveryPage/DateTextFormatter";

import FormTextareaField from "../../../Reusable/FormTextareaField";
import FormRadioField from "../../../Reusable/FormRadioField";
import FormMultiSelectField from "../../../Reusable/FormMultiSelectField";
import FormCheckboxField from "../../../Reusable/FormCheckboxField";
import FormPhoneField from "../../../Reusable/FormPhoneField";


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


function FirstAdd() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);

    ////
    //// Component states.
    ////

    // --- Page related states ---
    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [forceURL, setForceURL] = useState("");
    const [showCancelWarning, setShowCancelWarning] = useState(false);

    // --- Form related states ---
    const [organizationName, setOrganizationName] = useState("");
    const [organizationType, setOrganizationType] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [phoneType, setPhoneType] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isOkToText, setIsOkToText] = useState("");
    const [isOkToEmail, setIsOkToEmail] = useState("");
    const [country] = useState("");

    ////
    //// Event handling.
    ////

    const onSubmitClick = (e) => {
        console.log("onSubmitClick: Beginning...");

        // Save to persistent storage.
        let payload = {};
        payload.firstName = firstName;
        payload.lastName = lastName;
        payload.email = email;
        payload.phone = phone;
        payload.phoneType = phoneType;
        payload.isOkToText = isOkToText;
        payload.isOkToEmail = isOkToEmail;

        console.log("onSubmitClick: payload:", payload);
        setFetching(false);
        setErrors({});
        postClientCreateAPI(
            payload,
            onSuccess,
            onError,
            onDone,
            onUnauthorized
        );
    }

    ////
    //// API.
    ////

    function onSuccess(response){
        // For debugging purposes only.
        console.log("onSuccess: Starting...");
        console.log("onSuccess: response:", response);

        if (response === undefined || response === null || response === "") {
        console.log("onSuccess: exiting early");
            return;
        }

        // Add a temporary banner message in the app and then clear itself after 2 seconds.
        setTopAlertMessage("Client created");
        setTopAlertStatus("success");
        setTimeout(() => {
            console.log("onSuccess: Delayed for 2 seconds.");
            console.log("onSuccess: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
            setTopAlertMessage("");
        }, 2000);


        console.log("onSuccess: redirecting to details page for id:", response.id);

        // Redirect the user to a new page.
        setForceURL("/page/detail/first/"+response.id);
    }

    function onError(apiErr) {
        console.log("onError: Starting...");
        console.log("onError: apiErr:", apiErr);
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
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    if (forceURL !== "") {
        return <Navigate to={forceURL}  />
    }

    const phoneTypeOptions = [
        { value: 3, label: 'Landline' },
        { value: 2, label: 'Mobile' },
        { value: 1, label: 'Work' },
        { value: 0, label: "Please select" }
    ];

    return (
        <>
            <div class="container">
                <section class="section">
                    {/* Desktop Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/page/launchpad" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
                            <li class=""><Link to="/page/list/first" aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</Link></li>
                            <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</Link></li>
                        </ul>
                    </nav>

                    {/* Mobile Breadcrumbs */}
                    <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
                        <ul>
                            <li class=""><Link to="/page/list/first" aria-current="page"><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link></li>
                        </ul>
                    </nav>

                    {/* Page banner */}
                    {false && <AlertBanner message="Archived" status="info" />}

                    {/* Page Title */}
                    <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Client</h1>
                    <h4 class="subtitle is-4"><FontAwesomeIcon className="fas" icon={faPlus} />&nbsp;New</h4>
                    <hr />

                    {/* Page */}
                    <nav class="box">

                        {/* Title + Options */}
                        <div class="columns">
                            <div class="column">
                                <p class="title is-4"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Client Submission Form</p>
                            </div>
                            <div class="column has-text-right">

                            </div>
                        </div>

                        <p class="pb-4 has-text-grey">Please fill out all the required fields before submitting this form.</p>

                        {isFetching
                            ?
                            <PageLoadingContent displayMessage={"Loading..."} />
                            :
                            <>
                                <ErrorBox errors={errors} />

                                {<div class="container">

                                    <FormInputField
                                        label="First Name"
                                        name="firstName"
                                        placeholder="Text input"
                                        value={firstName}
                                        errorText={errors && errors.firstName}
                                        helpText=""
                                        onChange={(e)=>setFirstName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Last Name"
                                        name="lastName"
                                        placeholder="Text input"
                                        value={lastName}
                                        errorText={errors && errors.lastName}
                                        helpText=""
                                        onChange={(e)=>setLastName(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormInputField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Text input"
                                        value={email}
                                        errorText={errors && errors.email}
                                        helpText=""
                                        onChange={(e)=>setEmail(e.target.value)}
                                        isRequired={true}
                                        maxWidth="380px"
                                    />

                                    <FormCheckboxField
                                        label="I agree to receive electronic email"
                                        name="isOkToEmail"
                                        checked={isOkToEmail}
                                        errorText={errors && errors.isOkToEmail}
                                        onChange={(e,x)=>setIsOkToEmail(!isOkToEmail)}
                                        maxWidth="180px"
                                    />

                                    <FormPhoneField
                                        label="Phone"
                                        name="phone"
                                        placeholder="Text input"
                                        selectedCountry={country}
                                        selectePhoneNumber={phone}
                                        errorText={errors && errors.phone}
                                        helpText=""
                                        onChange={(ph)=>setPhone(ph)}
                                        isRequired={true}
                                        maxWidth="200px"
                                    />

                                    <FormSelectField
                                        label="Phone Type"
                                        name="phoneType"
                                        placeholder="Pick"
                                        selectedValue={phoneType}
                                        errorText={errors && errors.phoneType}
                                        helpText=""
                                        onChange={(e)=>setPhoneType(parseInt(e.target.value))}
                                        options={phoneTypeOptions}
                                    />

                                    <FormCheckboxField
                                        label="I agree to receive texts to my phone"
                                        name="isOkToText"
                                        checked={isOkToText}
                                        errorText={errors && errors.setIsOkToText}
                                        onChange={(e,x)=>setIsOkToText(!isOkToText)}
                                        maxWidth="180px"
                                    />

                                    <div class="columns pt-5">
                                        <div class="column is-half">
                                            <Link class="button is-fullwidth-mobile" to={`/page/list/first`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Clients</Link>
                                        </div>
                                        <div class="column is-half has-text-right">
                                            <button  class="button is-primary is-fullwidth-mobile" onClick={onSubmitClick} type="button">
                                                <FontAwesomeIcon className="fas" icon={faCircleCheck} />&nbsp;Submit
                                            </button>
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

export default FirstAdd;
