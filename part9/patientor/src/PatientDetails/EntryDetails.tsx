import React from "react";
import { Entry } from "../types";
import HealthCheckDetail from "./HealthCheckEntry";
import OccupationalHealthEntry from "./OccupationalHealthcareEntry";
import HospitalDetail from "./HospitalEntry";

export const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckDetail entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalHealthEntry entry={entry}/>;
    case "Hospital":
      return <HospitalDetail entry={entry}/>;
    default:
      return <div></div>;
  }
};