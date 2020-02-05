import React from "react";
import Icon from "@material-ui/core/Icon";
import withStyles from "@material-ui/core/es/styles/withStyles";
import { Fab, Tooltip } from "@material-ui/core";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

const notesheetCreateButton = props => {
  return (
    <Tooltip title="Add Note" aria-label="Add Note" onClick={props.click}>
      <Fab
        color="primary"
        aria-label="Add"
        style={{ position: "fixed", right: 230, bottom: 36, zIndex: 9000 }}
      >
        <Icon>add</Icon>
      </Fab>
    </Tooltip>
  );
};

export default withStyles(styles)(notesheetCreateButton);
