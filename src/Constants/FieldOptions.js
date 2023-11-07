

export const PAGE_SIZE_OPTIONS = [
    { value: 2, label: '2 Rows' },
    { value: 5, label: '5 Rows' },
    { value: 10, label: '10 Rows' },
    { value: 25, label: '25 Rows' },
    { value: 50, label: '50 Rows' },
    { value: 100, label: '100 Rows' },
    { value: 250, label: '250 Rows' },
];


export const CLIENT_SORT_OPTIONS = [
    { value: "join_date,ASC", label: 'Join Date 2000 -> 2023' },
    { value: "join_date,DESC", label: 'Join Date 2023 -> 2000' },
    { value: "last_name,ASC", label: 'Last Name A -> Z' },
    { value: "last_name,DESC", label: 'Last Name Z -> A' },
];

export const CLIENT_STATUS_FILTER_OPTIONS = [
    { value: 1, label: 'Active' },
    { value: 2, label: 'Archived' },
];

export const CLIENT_TYPE_OF_FILTER_OPTIONS = [
    { value: 0, label: 'All' },
    { value: 1, label: 'Residential' },
    { value: 2, label: 'Commercial' },
];

export const CLIENT_PHONE_TYPE_OF_OPTIONS = [
    { value: 1, label: 'Landline' },
    { value: 2, label: 'Mobile' },
    { value: 3, label: 'Work' },
];

export const CLIENT_PHONE_TYPE_OF_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...CLIENT_PHONE_TYPE_OF_OPTIONS
];

export const CLIENT_ORGANIZATION_TYPE_OPTIONS = [
    { value: 1, label: 'Private' },
    { value: 2, label: 'Non-profit' },
    { value: 3, label: 'Government' },
];

export const CLIENT_ORGANIZATION_TYPE_OPTIONS_WITH_EMPTY_OPTIONS = [
    { value: 0, label: "Please select" }, // EMPTY OPTION
    ...CLIENT_ORGANIZATION_TYPE_OPTIONS
];
