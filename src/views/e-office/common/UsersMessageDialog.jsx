import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Grid} from "@material-ui/core";
import DialogWrapper from "../files/dialog/common/DialogWrapper";
import Editor from "./Editor";
import MultiSelect from "./MultiSelect";
import Button from "@material-ui/core/Button"

class UsersMessageDialog extends Component {
  handleSelectChange = (value) => {
    console.log(value)
  }

  render() {
    const suggestions = [
      {label: 'User 1', value: '1'},
      {label: 'User 2', value: '2'},
      {label: 'User 3', value: '3'},
      {label: 'User 4', value: '4'},
    ]

    const dialogContent = <Grid container md={12}>
      <Grid item md={12}>
        <MultiSelect suggestions={suggestions} onChange={this.handleSelectChange}/><br/>
      </Grid>
      <Grid item md={12}>
        <Editor/>
      </Grid>
    </Grid>;

    const dialogActions = <>
      <Button color="primary" onClick={this.props.onClose}>Send Message</Button>
      <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
    </>;

    return (
        <DialogWrapper open={this.props.open} action={dialogActions} content={dialogContent}
                       onClose={this.props.onClose}/>
    );
  }
}

UsersMessageDialog.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default UsersMessageDialog;
