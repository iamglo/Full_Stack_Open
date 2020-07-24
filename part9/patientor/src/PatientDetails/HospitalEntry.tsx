import React from "react";
import { useStateValue } from "../state";
import { HospitalEntry } from "../types";
import DetailList from "./DetailList";
import { Card, Icon, List } from "semantic-ui-react";

const HospitalDetail: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  const [{ diagnosis }] = useStateValue();
  
  if (!diagnosis || !entry){
    return null;
  }

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
          <List.Header> Discharge Date: {entry.discharge.date} </List.Header>
          {entry.discharge.criteria}
        </List.Item>
      </List>
    </Card.Content>
  </Card>
  );
};

export default HospitalDetail;