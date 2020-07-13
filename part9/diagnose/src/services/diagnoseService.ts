import diagnoseEntries from '../data/diagnose'

import {Diagnoses} from '../types';

const getDiagnoses = (): Array<Diagnoses> => {
  return diagnoseEntries;
};

// const getNonSensitiveEntries = () : NonSensitiveDiaryEntry[] => {
//   return diaries.map(({id, date, weather, visibility}) => ({
//     id,
//     date,
//     weather,
//     visibility,
//   }));
// };
// const addEntry = () => {
//   return null;
// };

// const addEntry = () => {
//   return null;
// };

export default {
  getDiagnoses,
  // addEntry,
  // getNonSensitiveEntries
};