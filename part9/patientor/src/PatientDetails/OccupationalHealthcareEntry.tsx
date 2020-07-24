import React from "react";
import { useStateValue } from "../state";
import { OccupationalHealthcareEntry} from "../types";
import DetailList from "./DetailList";
import { Card, Icon, List } from "semantic-ui-react";

const OccupationalHealthEntry: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return (
    <Card>
    <Card.Content>
      <Card.Header>
        {entry.date} 
      </Card.Header>
      <Card.Description>
        {entry.description}
      </Card.Description>
      <DetailList entry={entry}></DetailList>
    </Card.Content>
    <Card.Content extra>
      <List>
        <List.Item>
          <List.Header> Employer Name: {entry.employerName} </List.Header>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
  );
};

export default OccupationalHealthEntry;