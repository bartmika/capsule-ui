import React from "react";
import { Link } from "react-router-dom";
import PhoneTextFormatter from "./EveryPage/PhoneTextFormatter";
import DateTextFormatter from "./EveryPage/DateTextFormatter";
import DateTimeTextFormatter from "./EveryPage/DateTimeTextFormatter";


function DataDisplayRowText(props) {
    const { label, value, helpText, type="text"} = props;
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control">
                <p>
                    {value
                        ?
                        <>
                        {type === "text" &&
                            value
                        }
                        {type === "email" &&
                            <Link to={`mailto:${value}`}>{value}</Link>
                        }
                        {type === "phone" &&
                            <PhoneTextFormatter value={value} />
                        }
                        {type === "datetime" &&
                            <DateTimeTextFormatter value={value} />
                        }
                        {type === "date" &&
                            <DateTextFormatter value={value} />
                        }
                        {type === "currency" &&
                            <>${value}</>
                        }
                        </>
                        :
                        "-"
                    }
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p class="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowText;
