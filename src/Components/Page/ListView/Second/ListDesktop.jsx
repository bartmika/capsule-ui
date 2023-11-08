import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Scroll from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faCalendarMinus, faCalendarPlus, faDumbbell, faCalendar, faGauge, faSearch, faEye, faPencil, faTrashCan, faPlus, faArrowRight, faTable, faArrowUpRightFromSquare, faFilter, faRefresh, faCalendarCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useRecoilState } from 'recoil';

import PhoneTextFormatter from "../../../Reusable/EveryPage/PhoneTextFormatter";
import EmailTextFormatter from "../../../Reusable/EveryPage/EmailTextFormatter";
import { PAGE_SIZE_OPTIONS } from "../../../../Constants/FieldOptions";


function SecondListDesktop(props) {
    const {
        listData,
        setPageSize,
        pageSize,
        previousCursors,
        onPreviousClicked,
        onNextClicked
    } = props;
    return (
        <div class="b-table">
            <div class="table-wrapper has-mobile-cards">
                <table class="table is-fullwidth is-striped is-hoverable is-fullwidth">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Second Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listData && listData.results && listData.results.map(function(datum, i){
                            return <tr>
                                <td></td>
                                <td data-label="Second Name">{datum.firstName}</td>
                                <td data-label="Last Name">{datum.lastName}</td>
                                <td data-label="Phone">
                                    {datum.phone
                                        ? <PhoneTextFormatter value={datum.phone} />
                                        : <>-</>
                                    }
                                </td>
                                <td data-label="Email">
                                    {datum.email
                                        ? <EmailTextFormatter value={datum.email} />
                                        : <>-</>
                                    }
                                </td>
                                <td class="is-actions-cell">
                                    <div class="buttons is-right">
                                        <Link to={`/501`} class="is-small">
                                            View&nbsp;<FontAwesomeIcon className="mdi" icon={faChevronRight} />
                                        </Link>
                                    </div>
                                </td>
                            </tr>;
                        })}
                    </tbody>
                </table>

                <div class="columns">
                    <div class="column is-half">
                        <span class="select">
                            <select class={`input has-text-grey-light`}
                                     name="pageSize"
                                 onChange={(e)=>setPageSize(parseInt(e.target.value))}>
                                {PAGE_SIZE_OPTIONS.map(function(option, i){
                                    return <option selected={pageSize === option.value} value={option.value}>{option.label}</option>;
                                })}
                            </select>
                        </span>

                    </div>
                    <div class="column is-half has-text-right">
                        {previousCursors.length > 0 &&
                            <>
                                <button class="button is-info" onClick={onPreviousClicked}>Previous</button>&nbsp;
                            </>
                        }
                        {listData.hasNextPage && <>
                            <button class="button is-info" onClick={onNextClicked}>Next</button>
                        </>}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SecondListDesktop;
