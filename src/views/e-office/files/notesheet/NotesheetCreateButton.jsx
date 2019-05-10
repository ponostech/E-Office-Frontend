import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {Fab, Tooltip} from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const notesheetCreateButton = (props) => {
  const {classes} = props;
  return (
      <Tooltip title="Add Note" aria-label="Add Note" onClick={props.click}>
        <Fab color="primary" aria-label="Add" style={{position: 'absolute', left: 270, bottom: 40, zIndex: 9000}}>
          <Icon>add</Icon>
        </Fab>
      </Tooltip>
  );
};

{/*<Button variant="outlined" size="small" color="primary" className={classes.button} onClick={props.click}>*/}
{/*  Create Note <Icon className={classes.rightIcon}>add</Icon>*/}
{/*</Button>;*/}

export default withStyles(styles)(notesheetCreateButton);