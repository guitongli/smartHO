

export function putRegion(region) {
    
    return {
        type: "PUT_REGION",
        region: region
       
    };
}

export function putTerm(term) {
    return {
        type: "PUT_TERM",

        term,
    };
}
export function putFirmName1(firm1) {
    return {
        type: "PUT_FIRM_Name_1",

        firm1,
    };
}
export function putFirmName2(firm2) {
    return {
        type: "PUT_FIRM_Name_2",

        firm2,
    };
}
export function putFirmAdd1(firm1) {
    return {
        type: "PUT_FIRM_ADD_1",

        firm1,
    };
}
export function putFirmAdd2(firm2) {
    return {
        type: "PUT_FIRM_ADD_2",

        firm2,
    };
}

