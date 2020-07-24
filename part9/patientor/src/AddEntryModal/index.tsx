import React from "react";
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from "./AddEntryModal";
import { EntryFormValue } from "../types";

interface Props {
  modalOpen: boolean ;
  onSubmit: (values: EntryFormValue) => void; 
  error?: string ;
  onClose: () => void;
}

const AddEntryModal: React.FC<Props> = ({modalOpen, onSubmit, error, onClose}: Props) => {
  return (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry </Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose}></AddEntryForm>
    </Modal.Content>
  </Modal>
  );
};

export default AddEntryModal;