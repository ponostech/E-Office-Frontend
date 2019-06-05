import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import DialogWrapper from "../files/dialog/common/DialogWrapper";
import Editor from "./Editor";
import MultiSelect from "./MultiSelect";

class UsersMessageDialog extends Component {
  render() {
    const dialogContent = <Grid container md={12}>
      <Grid item md={12}>
        {/*<MultiSelect/>*/}
      </Grid>
      <Grid item md={12}>
        <Editor/>
      </Grid>
    </Grid>;

    const dialogActions = <>
      dialog content
    </>;

    return (
        <DialogWrapper open={this.props.open} action={dialogActions} content={dialogContent} onClose={this.props.onClose}/>
    );
  }
}

UsersMessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default UsersMessageDialog;
