import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Button, Dialog, List, ListItem, Divider, AppBar, Toolbar, Slide, Grid, IconButton} from "@material-ui/core";
import {DialogActions, Typography} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {withStyles} from "@material-ui/core/styles";
import {GET_DRAFT} from "../../config/ApiRoutes";
import Editor from "../e-office/files/draft/Editor"
import ErrorHandler, {SuccessHandler} from "./StatusHandler";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DraftSingleViewDialog extends React.Component {
  state = {
    successMsg: null,
    errorMsg: null,
    content: "",
    loading: true
  };

  editorChange = (e) => {
    this.setState({content: e.target.getContent()});
  };

  validate = () => {
    if (this.state.content === "") {
      this.setState({errorMsg: "No change in the content yet"});
      return false;
    }
    return true;
  };

  saveEdit = (id) => {
    this.validate();
    axios.post(GET_DRAFT(id), {content: this.state.content})
        .then(res => {
          if (res.data.status) this.setState({successMsg: "Success"});
          else this.setState({errorMsg: res.data.messages});
        })
  };

  render() {
    const {classes, data, open, onClose} = this.props;
    const {errorMsg, successMsg} = this.state;

    const content =
        <>
          <Editor default={data.content} onChange={this.editorChange} height={600}/>
        </>;

    const actions =
        <DialogActions>
          <Button color="primary">Approve</Button>
          <Button color="primary" onClick={this.saveEdit.bind(this, data.id)}>Save Edit</Button>
          <Button color="secondary" onClick={onClose}>Close</Button>
        </DialogActions>;

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
                View Details
              </Typography>
              <Button onClick={onClose} color="inherit">
                Close
              </Button>
            </Toolbar>
          </AppBar>
          <List>
            <ListItem button>
              <Grid container>
                <Grid item xs={12}>
                  {content}
                </Grid>
              </Grid>
            </ListItem>
            <Divider/>
          </List>
          {actions}
          {errorMsg && <ErrorHandler messages={errorMsg}/>}
          {successMsg && <ErrorHandler messages={successMsg}/>}
        </Dialog>
    );
  }
}

DraftSingleViewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.any
};
export default withStyles(styles)(DraftSingleViewDialog);

