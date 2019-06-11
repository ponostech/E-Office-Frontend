import React from 'react';
import {Divider, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Tooltip} from "@material-ui/core";
import {RemoveRedEye} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const detailViewRow = (props) => (
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

export default detailViewRow;
