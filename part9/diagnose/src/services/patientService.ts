import { v4 as uuid } from "uuid";
import patientEntries from '../data/patient'

import {Patients, NonSensitivePatient, NewPatient, Entry} from '../types';

let patients = [...patientEntries]

const findById = (id: string): Patients => {
  const search = patients.find(e => e.id === id)
  if (!search){
    throw Error ("Id not found")
  }

  return search 
}

const getPatients = (): Array<Patients> => {
  return patients;
};

const getNonSensitiveEntries = () : NonSensitivePatient[] => {
  return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patients => {
  const newPatient = {
    id: uuid(),
    ...patient
  }

  patients.push(newPatient)
  
  return newPatient
};

const addEntry = (patient: Patients, entry: Entry): Patients => {

  const newPatient = {...patient, entries: patient.entries.concat(entry)};
  patients = patients.map(e => e.id === patient.id? newPatient: e)

  return newPatient
}
  

export default {
  findById,
  getNonSensitiveEntries,
  getPatients,
  addPatient,
  addEntry
};