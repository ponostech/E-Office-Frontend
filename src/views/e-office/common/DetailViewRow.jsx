import React from 'react';
import {Divider, ListItem, ListItemText, Tooltip} from "@material-ui/core";

const detailViewRow = (props) => (
    <>

      <Tooltip title="Click to View Details">
          <ListItem onClick={props.click ? props.click.bind(this, props.value) : null} button>
            <ListItemText primary={props.primary}
                          secondary={props.secondary}/>
          </ListItem>
      </Tooltip>
      <Divider/>
    </>
);

export default detailViewRow;
