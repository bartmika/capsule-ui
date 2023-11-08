import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

function DataDisplayRowDownloadLink(props) {
    const { label, filename="Download File", objectURL, helpText } = props;
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control">
                <p>
                    <a href={objectURL} target="_blank" rel="noreferrer" class="is-fullwidth-mobile"><FontAwesomeIcon className="fas" icon={faDownload} />&nbsp;{filename}</a>
                </p>
                {helpText !== undefined && helpText !== null && helpText !== "" && <p class="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowDownloadLink;
