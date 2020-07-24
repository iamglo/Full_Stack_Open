import React, { useEffect } from "react";
import axios from "axios";
import { Patient, EntryFormValue } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, updatePatient } from "../state";
import { useParams } from "react-router-dom";
import { EntryDetails } from "./EntryDetails";
import AddEntryModal  from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  
  const patient = patients[id];


  const openModal = (): void => setModalOpen(true);
  
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const getData = async () => {
    try {
      const {data: patientApi} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(updatePatient(patientApi));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {

    getData();

  }, [dispatch, id]); 

  const submitNewEntry = async (values: EntryFormValue) => {
    try {
      const { data: newEntry } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "UPDATE_PATIENT", payload: newEntry });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  if (!patient) {
    return null;
  }

  return(<div>
    <h2> {patient.name} </h2> <br/>
    ssn: {patient.ssn} <br/>
    occupation: {patient.occupation} <br/>
    <h3> entries </h3> <br/>
    {patient.entries.map((e) => (
      <EntryDetails entry={e} key={e.id}></EntryDetails>
    ))} 

     <AddEntryModal
        modalOpen = {modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
    <Button onClick={() => openModal()}>Add New Entry</Button>
  </div>);
};

export default PatientDetails;