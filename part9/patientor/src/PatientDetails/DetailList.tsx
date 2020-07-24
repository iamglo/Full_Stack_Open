import React from "react";
import { useStateValue } from "../state";
import { Entry} from "../types";
import { v4 as uuid } from "uuid";
import { List } from "semantic-ui-react";

const DetailList: React.FC<{entry: Entry}> = ({entry}) => {
  const [{ diagnosis }] = useStateValue();
  
  if (!diagnosis || !entry){
    return null;
  }

  return (    
    <List>
      {entry.diagnosisCodes?.map((c) => (
          <List.Item key={uuid()}> 
            <List.Content> 
              <List.Description>
                {c} : {diagnosis[c] && diagnosis[c].name} 
              </List.Description>
            </List.Content>
          </List.Item> 
      ))}
    </List>
  );
  
};

export default DetailList;