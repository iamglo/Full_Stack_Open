import {NewPatient, Entry, Gender} from "./types"

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (input: any): string => {
  if (!input || !isString(input)) {
    throw new Error('Incorrect or missing string: ' + input);
  }
  
  return input;
} 

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender
}

const parseEntries = (entries: any): Entry[] => {
  
  if (!entries){
    entries = Object.assign([], entries )
  }
  else if (!Array.isArray(entries)){
    throw new Error('Incorrect or missing entry');
  }
  return entries
}

export const toPatient = (object: any) : NewPatient => {
  return {
    name: parseString(object.name),
    dateOfBirth: parseString(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: parseEntries(object.entries)
  }
}


export const toEntry = (object: any) : Entry => {
  return {
    description: parseString(object.description),
    date: parseString(object.date),
    specialist: parseString(object.specialist),
    ...object
  }
}


