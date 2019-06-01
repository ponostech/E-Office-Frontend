import React from 'react';
import {Divider, ListItem, ListItemText, IconButton, ListItemSecondaryAction, Tooltip} from "@material-ui/core";
import {List, RemoveRedEye} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const detailViewRow = (props) => (
    <>
      <ListItem onClick={props.click ? props.click.bind(this, props.value) : null} button>
        <ListItemIcon>{props.icon ? props.icon : <List/>}</ListItemIcon>
        <ListItemText primary={props.primary} secondary={props.secondary}/>
        <ListItemSecondaryAction>
          <Tooltip title='View Details'>
            <IconButton color='primary'><RemoveRedEye/></IconButton>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider/>
    </>
);

export default detailViewRow;
