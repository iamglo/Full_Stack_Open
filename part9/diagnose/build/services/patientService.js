"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patient_1 = __importDefault(require("../data/patient"));
let patients = [...patient_1.default];
const findById = (id) => {
    const search = patients.find(e => e.id === id);
    console.log(search, patients);
    if (!search) {
        throw Error("Not found");
    }
    return search;
};
const getPatients = () => {
    return patients;
};
const getNonSensitiveEntries = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v4() }, patient);
    patients.push(newPatient);
    return newPatient;
};
const addEntry = (patient, entry) => {
    const newPatient = Object.assign(Object.assign({}, patient), { entries: patient.entries.concat(entry) });
    patients = patients.map(e => e.id === patient.id ? newPatient : e);
    return newPatient;
};
exports.default = {
    findById,
    getNonSensitiveEntries,
    getPatients,
    addPatient,
    addEntry
};
