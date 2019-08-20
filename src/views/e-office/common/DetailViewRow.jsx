import React from "react";
import { Divider, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const DetailViewRow = (props) => (
  <>
    <ListItem onClick={props.click ? props.click.bind(this, props.value) : null} component={'div'}>
      {props.icon && <ListItemIcon>{props.icon}</ListItemIcon>}
      <ListItemText primary={props.primary} secondary={props.secondary}/>
      <ListItemSecondaryAction>
        {props.children}
      </ListItemSecondaryAction>
    </ListItem>
    <Divider component={'div'}/>
  </>
);

export default DetailViewRow;
