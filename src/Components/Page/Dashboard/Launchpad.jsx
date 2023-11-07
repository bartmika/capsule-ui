import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faTable, faTasks, faGauge, faArrowRight, faUsers, faBarcode } from '@fortawesome/free-solid-svg-icons';


function DashboardLaunchpad() {

    ////
    //// Global state.
    ////


    ////
    //// Component states.
    ////

    ////
    //// API.
    ////

    ////
    //// Event handling.
    ////

    ////
    //// Misc.
    ////

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

    return (
        <>
            <div class="container">
                <section class="section">
                    <nav class="breadcrumb" aria-label="breadcrumbs">
                        <ul>
                            <li class="is-active"><Link to="/dashboard" aria-current="page"><FontAwesomeIcon className="fas" icon={faRocket} />&nbsp;Launchpad</Link></li>
                        </ul>
                    </nav>
                    <nav class="box">
                        <div class="columns">
                            <div class="column">
                                <h1 class="title is-4"><FontAwesomeIcon className="fas" icon={faRocket} />&nbsp;Launchpad</h1>
                            </div>
                        </div>

                        <section class="hero is-medium is-link">
                            <div class="hero-body">
                                <p class="title">
                                    <FontAwesomeIcon className="fas" icon={faGauge} />&nbsp;Dashboards
                                </p>
                                <p class="subtitle">
                                    Select from any of the following different dashboard designs:
                                    <br />
                                    <br />
                                    <i>Coming soon</i>
                                    <Link hidden={true} to={"/admin/dashboard/1"}>First&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                </p>
                            </div>
                        </section>

                        <section class="hero is-medium is-link">
                            <div class="hero-body">
                                <p class="title">
                                    <FontAwesomeIcon className="fas" icon={faTable} />&nbsp;Tabular Views
                                </p>
                                <p class="subtitle">
                                    Select from any of the following designs:
                                    <br />
                                    <br />
                                    <Link to={"/page/list/first"}>First&nbsp;<FontAwesomeIcon className="fas" icon={faArrowRight} /></Link>
                                </p>
                            </div>
                        </section>

                    </nav>
                </section>
            </div>
        </>
    );
}

export default DashboardLaunchpad;
