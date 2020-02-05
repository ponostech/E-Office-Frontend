import React, { Component } from "react";
import axios from "axios";
import { Button, Card, CardHeader, Grid, Divider } from "@material-ui/core";
import LoadingView from "../../../common/LoadingView";
import withStyles from "@material-ui/core/es/styles/withStyles";
import DialogWrapper from "./common/DialogWrapper";
import Editor from "../../common/Editor";
import {
  DRAFT_CREATE,
  GET_REJECT_TEMPLATE
} from "../../../../config/ApiRoutes";
import ErrorHandler, { SuccessHandler } from "../../../common/StatusHandler";
import SubmitDialog from "../../../../components/SubmitDialog";
import { withRouter } from "react-router-dom";
import { FILE_DETAIL_ROUTE } from "../../../../config/routes-constant/OfficeRoutes";

const styles = {};

class FileDraftRejectDialog extends Component {
  state = {
    content: "",
    loading: true,
    errorMsg: null,
    successMsg: null,
    submit: false
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get(GET_REJECT_TEMPLATE(this.props.module))
      .then(res => {
        if (res.data.status)
          this.setState({
            loading: false,
            content: res.data.data.template.content
          });
        else this.setState({ loading: false, errorMsg: res.data.messages });
      })
      .catch(err =>
        this.setState({ loading: false, errorMsg: err.toString() })
      );
  };

  editorChange = e => this.setState({ content: e.target.getContent() });

  onSubmit = () => {
    if (this.validate()) this.storeData();
  };

  validate = () => {
    if (this.state.content === "") {
      this.setState({ errorMsg: "Content cannot be blank!" });
      return false;
    }
    return true;
  };

  storeData = () => {
    this.setState({ submit: true });
    let params = {
      content: this.state.content,
      file_id: this.props.file.id,
      type: "reject"
    };
    axios
      .post(DRAFT_CREATE, params)
      .then(res => this.processResponse(res, this.props.file.id))
      .catch(err => this.setState({ submit: false, errorMsg: err.toString() }));
  };

  processResponse = (res, fileId) => {
    if (res.data.status) this.result(fileId);
    else
      this.setState({
        loading: false,
        submit: false,
        errorMsg: res.data.messages
      });
  };

  result = fileId => {
    this.setState({ successMsg: "Submitted Successfully" });
    setTimeout(() => {
      this.props.onClose();
      this.props.history.push(
        FILE_DETAIL_ROUTE(fileId) + "/view/draft-rejects"
      );
    }, 1000);
  };

  render() {
    const { open, onClose, file } = this.props;
    const { loading, errorMsg, successMsg, submit } = this.state;
    const content = (
      <Grid container>
        <Grid item lg={12}>
          <Editor
            onChange={this.editorChange}
            default={this.state.content}
            height={600}
          />
        </Grid>
      </Grid>
    );

    const dialogContent = (
      <Card>
        <CardHeader
          title={"File No.: " + file.number}
          subheader={"Subject: " + file.subject}
        />
        <Divider />
        {loading ? <LoadingView /> : content}
      </Card>
    );

    const action =
      submit || loading ? (
        ""
      ) : (
        <>
          <Button color="primary" onClick={this.onSubmit}>
            Save
          </Button>
          <Button color="secondary" onClick={onClose}>
            Cancel
          </Button>
        </>
      );

    return (
      <>
        <DialogWrapper
          title="Create Draft Reject"
          action={action}
          open={open}
          onClose={onClose}
          content={dialogContent}
        />
        {errorMsg && <ErrorHandler messages={errorMsg} />}
        {successMsg && <SuccessHandler messages={successMsg} />}
        {submit && (
          <SubmitDialog
            open={submit}
            title={"Create Draft"}
            text={"Draft is creating ..."}
          />
        )}
      </>
    );
  }
}

export default withRouter(withStyles(styles)(FileDraftRejectDialog));
