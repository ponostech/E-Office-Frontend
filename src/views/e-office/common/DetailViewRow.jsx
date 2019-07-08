import React from "react";
import { Divider, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const DetailViewRow = (props) => (
  <>
    <ListItem onClick={props.click ? props.click.bind(this, props.value) : null} button>
      {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
      <ListItemText primary={props.primary} secondary={props.secondary}/>
      <ListItemSecondaryAction>
        {props.children}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider/>
  </>
);

export default DetailViewRow;
