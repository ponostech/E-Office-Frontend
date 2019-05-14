import React from 'react';
import {Divider, ListItem, ListItemText} from "@material-ui/core";

const detailViewRow = (props) => (
    <>
      <ListItem button>
        <ListItemText primary={props.primary}
                      secondary={props.secondary}/>
      </ListItem>
      <Divider/>
    </>
);

export default detailViewRow;
