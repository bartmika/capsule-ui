import React, { useState, useEffect } from "react";
import { startCase } from 'lodash';
import Select from 'react-select'

import { getSkillSetSelectOptionListAPI } from "../../API/SkillSet";
import { getSelectedOptions } from "../../Helpers/selectHelper";


function FormMultiSelectFieldForSkillSets({
    label="SkillSets (Optional)",
    name="skillSets",
    placeholder="Please select skillSets",
    tenantID,
    skillSets,
    setSkillSets,
    errorText,
    validationText,
    helpText,
    maxWidth,
    disabled=false })
{
    ////
    //// Component states.
    ////

    const [errors, setErrors] = useState({});
    const [isFetching, setFetching] = useState(false);
    const [skillSetSelectOptions, setSkillSetSelectOptions] = useState([]);

    ////
    //// API.
    ////

    function onSkillSetSelectOptionsSuccess(response){
        // console.log("onSkillSetSelectOptionsSuccess: Starting...");
        let b = [
            // {"value": "", "label": "Please select"},
            ...response
        ]
        setSkillSetSelectOptions(b);
    }

    function onSkillSetSelectOptionsError(apiErr) {
        // console.log("onSkillSetSelectOptionsError: Starting...");
        setErrors(apiErr);
    }

    function onSkillSetSelectOptionsDone() {
        // console.log("onSkillSetSelectOptionsDone: Starting...");
        setFetching(false);
    }

    ////
    //// Event handling.
    ////

    const onSkillSetsChange = (e) => {
        // console.log("onSkillSetsChange, e:",e); // For debugging purposes only.
        let values = [];
        for (let option of e) {
            // console.log("option:",option); // For debugging purposes only.
            values.push(option.value);
        }
        // console.log("onSkillSetsChange, values:",values); // For debugging purposes only.
        setSkillSets(values);
    }


    ////
    //// Misc.
    ////

    useEffect(() => {
        let mounted = true;

        if (mounted) {
            setFetching(true);
            getSkillSetSelectOptionListAPI(
                onSkillSetSelectOptionsSuccess,
                onSkillSetSelectOptionsError,
                onSkillSetSelectOptionsDone
            );
        }

        return () => { mounted = false; }
    }, []);

    ////
    //// Component rendering.
    ////

    let style = {maxWidth:maxWidth};
    if (errorText) {
        style = {maxWidth:maxWidth, borderColor:"red", borderStyle: "solid", borderWidth: "1px"};
    }
    return (
        <div class="field pb-4">
            <label class="label">{label}</label>
            <div class="control" style={style}>
                <Select isMulti
                    placeholder={placeholder}
                           name="skillSets"
                        options={skillSetSelectOptions}
                          value={getSelectedOptions(skillSetSelectOptions, skillSets)}
                    isClearable={false}
                       onChange={onSkillSetsChange}
                     isDisabled={disabled}
                     isLoading={isFetching}
                />
            </div>
            {errorText &&
                <p class="help is-danger">{errorText}</p>
            }
            {helpText &&
                <p class="help">{helpText}</p>
            }
        </div>


    );
}

export default FormMultiSelectFieldForSkillSets;
