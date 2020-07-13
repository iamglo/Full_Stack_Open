"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEntry = exports.toPatient = void 0;
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseString = (input) => {
    if (!input || !isString(input)) {
        throw new Error('Incorrect or missing string: ' + input);
    }
    return input;
};
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseEntries = (entries) => {
    if (!entries) {
        entries = Object.assign([], entries);
    }
    else if (!Array.isArray(entries)) {
        throw new Error('Incorrect or missing entry');
    }
    return entries;
};
exports.toPatient = (object) => {
    return {
        name: parseString(object.name),
        dateOfBirth: parseString(object.dateOfBirth),
        ssn: parseString(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseString(object.occupation),
        entries: parseEntries(object.entries)
    };
};
// description: string;
// date: string;
// specialist: string;
// diagnosisCodes?: Array<Diagnosis['code']>;
exports.toEntry = (object) => {
    return Object.assign({ description: parseString(object.description), date: parseString(object.date), specialist: parseString(object.specialist) }, object);
};
// export default toPatient 
