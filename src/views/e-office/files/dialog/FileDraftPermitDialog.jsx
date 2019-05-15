import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, CardHeader, Grid, Divider} from "@material-ui/core";
import LoadingView from "../../../common/LoadingView";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DialogWrapper from './common/DialogWrapper';
import Editor from "../draft/Editor";
import {ApiRoutes, DRAFT_CREATE, GET_PERMIT_TEMPLATE} from "../../../../config/ApiRoutes";
import ErrorHandler, {SuccessHandler} from "../../../common/StatusHandler";

const styles = {};

class FileDraftPermitDialog extends Component {
  state = {
    content: '',
    loading: true,
    errorMsg: null,
  };

  componentDidMount() {
    axios.get(GET_PERMIT_TEMPLATE('hoarding'))
        .then(res => {
          this.setState({loading: false, content: res.data.data.template.content})
        })
  }

  editorChange = (e) => {
    this.setState({content: e.target.getContent()})
  };

  processResponse = (res) => {
    if (res.data.status) {
      window.location.reload()
    } else {
      this.setState({loading: false, errorMsg: res.data.messages})
    }
  };

  storeData = () => {
    let params = {
      content: this.state.content,
      file_id: this.props.file.id,
      type: 'general'
    };
    axios.post(DRAFT_CREATE, params)
        .then(res => {
          this.processResponse(res);
        })
        .catch(err => this.setState({errorMsg: "Network Error"}));
  };

  validate = () => {
    if (this.state.content === "") {
      this.setState({errorMsg: 'Content cannot be blank!'});
      return false;
    }
    return true;
  };

  onSubmit = () => {
    if (this.validate()) this.storeData();
  };

  render() {
    const {open, onClose, file} = this.props;
    const {loading, errorMsg} = this.state;
    const content =
        <Grid container>
          <Grid item lg={12}>
            <Editor onChange={this.editorChange} default={this.state.content} height={1000}/>
          </Grid>
        </Grid>;

    const dialogContent =
        <Card>
          <CardHeader title={"File No.: " + file.number} subheader={"Subject: " + file.subject}/>
          <Divider/>
          {loading ? <LoadingView/> : content}
        </Card>;

    const action =
        <>
          <Button color="primary" onClick={this.onSubmit}>Save</Button>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
        </>;

    return (
        <>
          <DialogWrapper title="Create Draft Permit" action={action} open={open} onClose={onClose}
                         content={dialogContent}/>
          {errorMsg && <ErrorHandler messages={errorMsg}/>}
        </>
    )
  }
}

export default withStyles(styles)(FileDraftPermitDialog);