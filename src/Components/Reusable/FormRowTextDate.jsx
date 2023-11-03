import React from "react";
import DateTextFormatter from "./EveryPage/DateTextFormatter";


function FormTextDateRow(props) {
    const { label, value, helpText } = props;
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control">
            <p>{value ? <DateTextFormatter value={value} /> : "-"}</p>
            {helpText !== undefined && helpText !== null && helpText !== "" && <p class="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default FormTextDateRow;
