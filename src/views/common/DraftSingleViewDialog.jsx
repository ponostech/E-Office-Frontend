import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {Button, DialogActions} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {GET_DRAFT} from "../../config/ApiRoutes";
import Editor from "../e-office/files/draft/Editor"
import DialogWrapper from "../e-office/files/dialog/common/DialogWrapper";

const styles = {
  appBar: {
    position: "relative"
  },
  flex: {
    flex: 1
  }
};

class DraftSingleViewDialog extends React.Component {
  state = {
    successMsg: '',
    errorMsg: '',
    data: '',
    loading: true
  };

  editorChange = (e) => {
    this.setState({data: e.target.getContent()});
  };

  validate = () => {
    if (this.state.data === "") {
      this.setState({errorMsg: "No change in the content yet"});
      return false;
    }
    return true;
  };

  saveEdit = (id) => {
    this.validate();
    axios.post(GET_DRAFT(id), {content: this.state.data})
        .then(res => {
          if (res.data.status) this.setState({successMsg: res.data.messages});
          else this.setState({errorMsg: res.data.messages});
        })
  };

  render() {
    const {data, open, onClose} = this.props;
    const {errorMsg, successMsg} = this.state;

    const content =
        <>
          <Editor default={data.content} onChange={this.editorChange} height={700}/>
        </>;

    const actions =
        <>
          <Button color="primary">Approve</Button>
          <Button color="primary" onClick={this.saveEdit.bind(this, data.id)}>Save Edit</Button>
          <Button color="secondary" onClick={onClose}>Close</Button>
        </>;

    return (
        <>
          <DialogWrapper open={open} title="View/Edit Draft" content={content} action={actions}
                         errors={errorMsg} success={successMsg} onClose={onClose}/>
        </>
    );
  }
}

DraftSingleViewDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.any
};

export default withStyles(styles)(DraftSingleViewDialog);

