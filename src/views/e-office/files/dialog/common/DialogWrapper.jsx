import React, {Component} from 'react';
import axios from 'axios/index';
import IconButton from "@material-ui/core/IconButton/index";
import CloseIcon from "@material-ui/icons/Close";
import {AppBar, Toolbar, Typography, Button, List, Dialog, DialogActions, Card, CardHeader} from "@material-ui/core";
import Divider from "@material-ui/core/Divider/index";
import LoadingView from "../../../../common/LoadingView";
import Slide from "@material-ui/core/Slide/index";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DialogContent from "@material-ui/core/DialogContent/index";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  },
  actionWrap: {
    marginBottom: 60,
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DialogWrapper extends Component {
  state = {
    loading: false,
  };

  render() {
    const {classes, open, title, closeLabel, content, action, onClose} = this.props;
    return (
        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton color="inherit" onClick={onClose} aria-label="Close">
                <CloseIcon/>
              </IconButton>
              <Typography variant="subtitle2" color="inherit" className={classes.flex}>
                {title}
              </Typography>
              <Button onClick={onClose} color="inherit">
                {closeLabel ? closeLabel : "Close"}
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {content}
          </DialogContent>
          <Divider/>
          <DialogActions className={classes.actionWrap}>{action}</DialogActions>
        </Dialog>
    )
  }
}

export default withStyles(styles)(DialogWrapper);