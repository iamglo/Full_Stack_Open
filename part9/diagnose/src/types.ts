export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {date: string; criteria: string};
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {startDate: string; endDate: string};
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
} 

export interface Patients {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[]
} 

export enum Gender {
  Male = "male",
  Female = "female",
}

export type NewPatient = Omit<Patients, 'id'>;

export type NonSensitivePatient = Omit<Patients, 'ssn'>;

export type PublicPatient = Omit<Patients, 'ssn' | 'entries' >