import React, {Component} from 'react';
import axios from 'axios';
import {Button, Card, CardHeader, Grid, Divider} from "@material-ui/core";
import LoadingView from "../../../common/LoadingView";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DialogWrapper from './common/DialogWrapper';
import Editor from "../../common/Editor";
import {DRAFT_CREATE, FILE_DRAFT_VIEW} from "../../../../config/ApiRoutes";
import ErrorHandler, {SuccessHandler} from "../../../common/StatusHandler";
import SubmitDialog from "../../../../components/SubmitDialog";
import {withRouter} from "react-router-dom";
import {FILE_DETAIL_ROUTE} from "../../../../config/routes-constant/OfficeRoutes";

const styles = {};

class FileDraftDialog extends Component {
  state = {
    content: '',
    loading: false,
    successMsg: null,
    errorMsg: null,
    submit: false,
  };

  componentDidMount() {
    this.setState({file: this.props.file});
  }

  editorChange = (e) => this.setState({content: e.target.getContent()});

  processResponse = (res, fileId) => {
    if (res.data.status) this.processSuccess(res, fileId);
    else this.setState({submit: false, loading: false, errorMsg: res.data.messages})
  };

  processSuccess = (res, fileId) => {
    this.setState({successMsg: res.data.messages});
    setTimeout(() => {this.props.onClose(); this.props.history.push(FILE_DETAIL_ROUTE(fileId) + "/view/drafts")}, 1000);
  };

  storeData = () => {
    let params = {
      content: this.state.content,
      file_id: this.props.file.id,
      type: 'general'
    };
    axios.post(DRAFT_CREATE, params)
        .then(res => this.processResponse(res, this.props.file.id))
        .catch(err => this.setState({submit: false, errorMsg: err.toString()}));
  };

  valid = () => this.state.content !== "";

  onSubmit = () => {
    this.setState({submit: true});
    if (this.valid()) this.storeData();
    else this.setState({errorMsg: 'Content cannot be blank!'});
  };

  render() {
    const {open, onClose, file} = this.props;
    const {loading, errorMsg, successMsg, submit} = this.state;
    const content =
        <Grid container>
          <Grid item lg={12}>
            <Editor onChange={this.editorChange} default={this.state.content} height={500}/>
          </Grid>
        </Grid>;

    const dialogContent =
        <Card>
          <CardHeader title={"File No.: " + file.number} subheader={"Subject: " + file.subject}/>
          <Divider/>
          {loading ? <LoadingView/> : content}
        </Card>;

    let action = (submit || loading) ? "" :
        <>
          <Button color="primary" onClick={this.onSubmit}>Save</Button>
          <Button color="secondary" onClick={onClose}>Cancel</Button>
        </>;

    return (
        <>
          <DialogWrapper title="Create Draft" action={action} open={open} onClose={onClose} content={dialogContent}/>
          {errorMsg && <ErrorHandler messages={errorMsg}/>}
          {successMsg && <SuccessHandler messages={successMsg}/>}
          {submit && <SubmitDialog open={submit} title={"Create Draft"} text={"Draft is creating ..."}/>}
        </>
    )
  }
}

export default withRouter(withStyles(styles)(FileDraftDialog));