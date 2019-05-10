import React from 'react';
import {CardHeader, List, ListItem, ListItemText, Divider} from "@material-ui/core";
import moment from 'moment';

const fileDetails = (props) => {
  const file = props.file;
  console.log("file", file);
  return (
      <List>
        <CardHeader title="File Details"/>
        <Divider/>
        <ListItem button>
          <ListItemText primary="File Number" secondary={file.number}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Subject" secondary={file.subject}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Branch" secondary={file.branch}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Classification" secondary={file.classification}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Remark" secondary={file.remark ? file.remark : 'No Remarks'}/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Status" secondary={file.status}/>
        </ListItem>
        <Divider/>
        {file.status === "active" ?
            <><ListItem button>
              <ListItemText primary="Current Location"
                            secondary={file.desk.staff.name + "(" + file.desk.staff.designation + ")"}/>
            </ListItem><Divider/></>: null
        }
        <ListItem button>
          <ListItemText primary="Created On" secondary={moment(file.created_at).format("Do MMMM YYYY")}/>
        </ListItem>
        <Divider/>
      </List>
  );
};

export default fileDetails;