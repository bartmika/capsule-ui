import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilterCircleXmark,faArrowLeft, faUserCircle, faTachometer, faEye, faPencil, faTrashCan, faPlus, faGauge, faArrowRight, faTable, faArrowUpRightFromSquare, faRefresh, faFilter, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import { getClientListAPI } from "../../../../API/Client";
import {
    topAlertMessageState,
    topAlertStatusState,
    currentUserState,
    clientFilterStatusState,
    clientFilterTypeState,
    clientFilterSortState
} from "../../../../AppState";
import ErrorBox from "../../../Reusable/EveryPage/ErrorBox";
import PageLoadingContent from "../../../Reusable/EveryPage/PageLoadingContent";
import FormInputFieldWithButton from  "../../../Reusable/FormInputFieldWithButton";
import FormSelectField from  "../../../Reusable/FormSelectField";
import FormDateField from "../../../Reusable/FormDateField";
import BubbleLink from "../../../Reusable/EveryPage/BubbleLink";
import { USER_ROLES,
    PAGE_SIZE_OPTIONS,
//     USER_STATUS_LIST_OPTIONS,
//     USER_ROLE_LIST_OPTIONS,
//     CLIENT_SORT_OPTIONS,
//     CLIENT_STATUS_FILTER_OPTIONS,
//     CLIENT_TYPE_OF_FILTER_OPTIONS
} from "../../../../Constants/FieldOptions";
import {
    DEFAULT_CLIENT_LIST_SORT_BY_VALUE,
    DEFAULT_CLIENT_STATUS_FILTER_OPTION
} from "../../../../Constants/App";
import FirstListDesktop from "./ListDesktop";
import FirstListMobile from "./ListMobile";


function FirstList() {

    ////
    //// Global state.
    ////

    const [topAlertMessage, setTopAlertMessage] = useRecoilState(topAlertMessageState);
    const [topAlertStatus, setTopAlertStatus] = useRecoilState(topAlertStatusState);
    const [currentUser] = useRecoilState(currentUserState);
    const [status, setStatus] = useRecoilState(clientFilterStatusState);                   // Filtering
    const [type, setType] = useRecoilState(clientFilterTypeState);                         // Filtering
    const [sortByValue, setSortByValue] = useRecoilState(clientFilterSortState);           // Sorting

    ////
    //// Component states.
    ////

    const [onPageLoaded, setOnPageLoaded] = useState(false);
    const [errors, setErrors] = useState({});
    const [forceURL, setForceURL] = useState("");
    const [users, setClients] = useState("");
    const [selectedClientForDeletion, setSelectedClientForDeletion] = useState("");
    const [isFetching, setFetching] = useState(false);
    const [pageSize, setPageSize] = useState(10);                                      // Pagination
    const [previousCursors, setPreviousCursors] = useState([]);                        // Pagination
    const [nextCursor, setNextCursor] = useState("");                                  // Pagination
    const [currentCursor, setCurrentCursor] = useState("");                            // Pagination

    ////
    //// API.
    ////

    function onClientListSuccess(response){
        console.log("onClientListSuccess: Starting...");
        if (response.results !== null) {
            setClients(response);
            if (response.hasNextPage) {
                setNextCursor(response.nextCursor); // For pagination purposes.
            }
        }
    }

    function onClientListError(apiErr) {
        console.log("onClientListError: Starting...");
        setErrors(apiErr);

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    function onClientListDone() {
        console.log("onClientListDone: Starting...");
        setFetching(false);
    }

    // function onClientDeleteSuccess(response){
    //     console.log("onClientDeleteSuccess: Starting..."); // For debugging purposes only.
    //
    //     // Update notification.
    //     setTopAlertStatus("success");
    //     setTopAlertMessage("Client deleted");
    //     setTimeout(() => {
    //         console.log("onDeleteConfirmButtonClick: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
    //         setTopAlertMessage("");
    //     }, 2000);
    //
    //     // Fetch again an updated list.
    //     fetchList(currentCursor, pageSize, "", sortByValue, status, type);
    // }
    //
    // function onClientDeleteError(apiErr) {
    //     console.log("onClientDeleteError: Starting..."); // For debugging purposes only.
    //     setErrors(apiErr);
    //
    //     // Update notification.
    //     setTopAlertStatus("danger");
    //     setTopAlertMessage("Failed deleting");
    //     setTimeout(() => {
    //         console.log("onClientDeleteError: topAlertMessage, topAlertStatus:", topAlertMessage, topAlertStatus);
    //         setTopAlertMessage("");
    //     }, 2000);
    //
    //     // The following code will cause the screen to scroll to the top of
    //     // the page. Please see ``react-scroll`` for more information:
    //     // https://github.com/fisshy/react-scroll
    //     var scroll = Scroll.animateScroll;
    //     scroll.scrollToTop();
    // }
    //
    // function onClientDeleteDone() {
    //     console.log("onClientDeleteDone: Starting...");
    //     setFetching(false);
    // }
    //
    // const onUnauthorized = () => {
    //     setForceURL("/login?unauthorized=true"); // If token expired or user is not logged in, redirect back to login.
    // }
    //
    // ////
    // //// Event handling.
    // ////
    //
    // // Function resets the filter state to its default state.
    // const onClearFilterClick = (e) => {
    //     setType(0);
    //     setStatus(1);
    //     setSortByValue(DEFAULT_CLIENT_LIST_SORT_BY_VALUE);
    // }
    //
    // const fetchList = (cur, limit, keywords, so, s, t) => {
    //     setFetching(true);
    //     setErrors({});
    //
    //     let params = new Map();
    //     params.set("page_size", limit);     // Pagination
    //     params.set("sort_field", "last_name") // Sorting
    //
    //     if (cur !== "") { // Pagination
    //         params.set("cursor", cur);
    //     }
    //
    //     // DEVELOPERS NOTE: Our `sortByValue` is string with the sort field
    //     // and sort order combined with a comma seperation. Therefore we
    //     // need to split as follows.
    //     const sortArray = so.split(",");
    //     params.set("sort_field", sortArray[0]);
    //     params.set("sort_order", sortArray[1]);
    //
    //     // Filtering
    //     if (keywords !== undefined && keywords !== null && keywords !== "") { // Searhcing
    //         params.set("search", keywords);
    //     }
    //     if (s !== undefined && s !== null && s !== "") {
    //         params.set("status", s);
    //     }
    //     if (t !== undefined && t !== null && t !== "") {
    //         params.set("type", t);
    //     }
    //
    //     getClientListAPI(
    //         params,
    //         onClientListSuccess,
    //         onClientListError,
    //         onClientListDone,
    //         onUnauthorized
    //     );
    // }
    //
    // const onNextClicked = (e) => {
    //     let arr = [...previousCursors];
    //     arr.push(currentCursor);
    //     setPreviousCursors(arr);
    //     setCurrentCursor(nextCursor);
    // }
    //
    // const onPreviousClicked = (e) => {
    //     let arr = [...previousCursors];
    //     const previousCursor = arr.pop();
    //     setPreviousCursors(arr);
    //     setCurrentCursor(previousCursor);
    // }
    //
    // const onSelectClientForDeletion = (e, user) => {
    //     console.log("onSelectClientForDeletion", user);
    //     setSelectedClientForDeletion(user);
    // }
    //
    // const onDeselectClientForDeletion = (e) => {
    //     console.log("onDeselectClientForDeletion");
    //     setSelectedClientForDeletion("");
    // }
    //
    // const onDeleteConfirmButtonClick = (e) => {
    //     console.log("onDeleteConfirmButtonClick"); // For debugging purposes only.
    //
    //     deleteClientAPI(
    //         selectedClientForDeletion.id,
    //         onClientDeleteSuccess,
    //         onClientDeleteError,
    //         onClientDeleteDone,
    //         onUnauthorized
    //     );
    //     setSelectedClientForDeletion("");
    // }
    //
    // ////
    // //// Misc.
    // ////
    //
    // useEffect(() => {
    //     let mounted = true;
    //
    //     if (mounted) {
    //         fetchList(currentCursor, pageSize, "", sortByValue, status, type);
    //
    //         // If you loaded the page for the very first time.
    //         if (onPageLoaded === false) {
    //             window.scrollTo(0, 0);  // Start the page at the top of the page.
    //             setOnPageLoaded(true);
    //         }
    //     }
    //
    //     return () => { mounted = false; }
    // }, [onPageLoaded, currentCursor, pageSize, sortByValue, status, type]);
    //
    // ////
    // //// Component rendering.
    // ////
    //
    // if (forceURL !== "") {
    //     return <Navigate to={forceURL}  />
    // }
    return null;

    // return (
    //     <>
    //         <div class="container">
    //             <section class="section">
    //
    //                 {/* Desktop Breadcrumbs */}
    //                 <nav class="breadcrumb has-background-light p-4 is-hidden-touch" aria-label="breadcrumbs">
    //                     <ul class="">
    //                         <li class=""><Link to="/admin/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboard</Link></li>
    //                         <li class="is-active"><Link aria-current="page"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</Link></li>
    //                     </ul>
    //                 </nav>
    //
    //                 {/* Mobile Breadcrumbs */}
    //                 <nav class="breadcrumb has-background-light p-4 is-hidden-desktop" aria-label="breadcrumbs">
    //                     <ul>
    //                         <li class="">
    //                             <Link to="/admin/dashboard" aria-current="page">
    //                                 <FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard
    //                             </Link>
    //                         </li>
    //                     </ul>
    //                 </nav>
    //
    //                 {/* Page Title */}
    //                 <h1 class="title is-2"><FontAwesomeIcon className="fas" icon={faUserCircle} />&nbsp;Clients</h1>
    //                 <hr />
    //
    //                 {/* Page Menu Options */}
    //                 <section class="hero ">
    //                     <div class="hero-body has-text-centered">
    //                         <div class="container">
    //                             <div class="columns is-vcentered">
    //                                 <div class="column">
    //                                     <BubbleLink
    //                                         title={`Add`}
    //                                         subtitle={`Add clients`}
    //                                         faIcon={faPlus}
    //                                         url={`/admin/clients/add/step-1`}
    //                                         bgColour={`has-background-danger-dark`}
    //                                     />
    //                                 </div>
    //                                 <div className="column">
    //                                     <BubbleLink
    //                                         title={`Search`}
    //                                         subtitle={`Search clients`}
    //                                         faIcon={faSearch}
    //                                         url={`/admin/clients/search`}
    //                                         bgColour={`has-background-success-dark`}
    //                                     />
    //                                 </div>
    //                             </div>
    //                         </div>
    //                     </div>
    //                 </section>
    //
    //                 {/* Page Modal(s) */}
    //                 <div class={`modal ${selectedClientForDeletion ? 'is-active' : ''}`}>
    //                     <div class="modal-background"></div>
    //                     <div class="modal-card">
    //                         <header class="modal-card-head">
    //                             <p class="modal-card-title">Are you sure?</p>
    //                             <button class="delete" aria-label="close" onClick={onDeselectClientForDeletion}></button>
    //                         </header>
    //                         <section class="modal-card-body">
    //                             You are about to <b>archive</b> this user; it will no longer appear on your dashboard This action can be undone but you'll need to contact the system administrator. Are you sure you would like to continue?
    //                         </section>
    //                         <footer class="modal-card-foot">
    //                             <button class="button is-success" onClick={onDeleteConfirmButtonClick}>Confirm</button>
    //                             <button class="button" onClick={onDeselectClientForDeletion}>Cancel</button>
    //                         </footer>
    //                     </div>
    //                 </div>
    //
    //                 {/* Page Table */}
    //                 <nav class="box" style={{ borderRadius: "20px"}}>
    //
    //                     {/* Title + Options */}
    //                     <div class="columns">
    //                         <div class="column">
    //                             <h1 class="title is-3"><FontAwesomeIcon className="fas" icon={faTable} />&nbsp;List</h1>
    //                         </div>
    //                     </div>
    //
    //                     {/* Filter Panel */}
    //                     <div class="has-background-white-bis" style={{borderRadius:"15px", padding:"20px"}}>
    //                         <div class="columns is-12">
    //                             <div class="column is-half">
    //                                 <h1 class="subtitle is-5 is-underlined"><FontAwesomeIcon className="fas" icon={faFilter} />&nbsp;Filtering & Sorting</h1>
    //                             </div>
    //                             <div class="column is-half has-text-right">
    //                                 <Link onClick={onClearFilterClick}>
    //                                     <FontAwesomeIcon className="mdi" icon={faFilterCircleXmark} />&nbsp;Clear Filter
    //                                 </Link>
    //                             </div>
    //                         </div>
    //
    //                         <div class="columns">
    //                             <div class="column">
    //                                 <FormSelectField
    //                                     label="Status"
    //                                     name="status"
    //                                     placeholder="Pick status"
    //                                     selectedValue={status}
    //                                     helpText=""
    //                                     onChange={(e)=>setStatus(parseInt(e.target.value))}
    //                                     options={CLIENT_STATUS_FILTER_OPTIONS}
    //                                     isRequired={true}
    //                                 />
    //                             </div>
    //                             <div class="column">
    //                                 <FormSelectField
    //                                     label="Type"
    //                                     name="type"
    //                                     placeholder="Pick client type"
    //                                     selectedValue={type}
    //                                     helpText=""
    //                                     onChange={(e)=>setType(parseInt(e.target.value))}
    //                                     options={CLIENT_TYPE_OF_FILTER_OPTIONS}
    //                                     isRequired={true}
    //                                 />
    //                             </div>
    //                             <div class="column">
    //                                 <FormSelectField
    //                                     label="Sort by"
    //                                     name="sortByValue"
    //                                     placeholder="Pick sorting"
    //                                     selectedValue={sortByValue}
    //                                     helpText=""
    //                                     onChange={(e)=>setSortByValue(e.target.value)}
    //                                     options={CLIENT_SORT_OPTIONS}
    //                                     isRequired={true}
    //                                 />
    //                             </div>
    //                         </div>
    //                     </div>
    //
    //                     {/* Table Contents */}
    //                     {isFetching
    //                         ?
    //                         <PageLoadingContent displayMessage={"Loading..."} />
    //                         :
    //                         <>
    //                             <ErrorBox errors={errors} />
    //                             {users && users.results && (users.results.length > 0 || previousCursors.length > 0)
    //                                 ?
    //                                 <div class="container">
    //                                     {/*
    //                                         ##################################################################
    //                                         EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A DESKTOP SCREEN.
    //                                         ##################################################################
    //                                     */}
    //                                     <div class="is-hidden-touch" >
    //                                         <FirstListDesktop
    //                                             listData={users}
    //                                             setPageSize={setPageSize}
    //                                             pageSize={pageSize}
    //                                             previousCursors={previousCursors}
    //                                             onPreviousClicked={onPreviousClicked}
    //                                             onNextClicked={onNextClicked}
    //                                             onSelectClientForDeletion={onSelectClientForDeletion}
    //                                         />
    //                                     </div>
    //
    //                                     {/*
    //                                         ###########################################################################
    //                                         EVERYTHING INSIDE HERE WILL ONLY BE DISPLAYED ON A TABLET OR MOBILE SCREEN.
    //                                         ###########################################################################
    //                                     */}
    //                                     <div class="is-fullwidth is-hidden-desktop">
    //                                         <FirstListMobile
    //                                             listData={users}
    //                                             setPageSize={setPageSize}
    //                                             pageSize={pageSize}
    //                                             previousCursors={previousCursors}
    //                                             onPreviousClicked={onPreviousClicked}
    //                                             onNextClicked={onNextClicked}
    //                                             onSelectClientForDeletion={onSelectClientForDeletion}
    //                                         />
    //                                     </div>
    //                                 </div>
    //                                 :
    //                                 <section class="hero is-medium has-background-white-ter">
    //                                     <div class="hero-body">
    //                                         <p class="title">
    //                                             <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;No Clients
    //                                         </p>
    //                                         <p class="subtitle">
    //                                             No clients. <b><Link to="/admin/clients/add/step-1">Click here&nbsp;<FontAwesomeIcon className="mdi" icon={faArrowRight} /></Link></b> to get started creating your first client.
    //                                         </p>
    //                                     </div>
    //                                 </section>
    //                             }
    //                         </>
    //                     }
    //                     <div class="columns pt-5">
    //                         <div class="column is-half">
    //                             <Link class="button is-fullwidth-mobile" to={`/admin/dashboard`}><FontAwesomeIcon className="fas" icon={faArrowLeft} />&nbsp;Back to Dashboard</Link>
    //                         </div>
    //                         <div class="column is-half has-text-right">
    //
    //                         </div>
    //                     </div>
    //                 </nav>
    //             </section>
    //         </div>
    //     </>
    // );
}

export default FirstList;
