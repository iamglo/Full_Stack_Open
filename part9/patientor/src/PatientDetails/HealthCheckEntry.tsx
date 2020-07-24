import React from "react";
import { HealthCheckEntry} from "../types";
import DetailList from "./DetailList";
import { Card, Icon, List } from "semantic-ui-react";

const HealthCheckDetail: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
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
          <List.Header> Health Check Rating: {entry.healthCheckRating} </List.Header>
        </List.Item>
      </List>
    </Card.Content>
  </Card>
  );
};

export default HealthCheckDetail;