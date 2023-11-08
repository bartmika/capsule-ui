import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload } from '@fortawesome/free-solid-svg-icons'

function DataDisplayRowImage(props) {
    const { label, filename="Download File", objectURL, helpText, maxWidth } = props;
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control">
                <p>
                    <figure class="image">
                        <a href={objectURL} target="_blank" rel="noreferrer" class="is-fullwidth-mobile">
                            <img src={objectURL}  style={{maxWidth:maxWidth}} />
                        </a>
                    </figure>
                </p>

                {helpText !== undefined && helpText !== null && helpText !== "" && <p class="help">{helpText}</p>}
            </div>
        </div>
    );
}

export default DataDisplayRowImage;
