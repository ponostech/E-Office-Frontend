import React from "reactn";
import axios from "axios";
import PropTypes from "prop-types";
import {Button, DialogActions} from "@material-ui/core";
import {withStyles} from "@material-ui/core/styles";
import {UPDATE_DRAFT} from "../../config/ApiRoutes";
import Editor from "../e-office/common/Editor"
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
    content: '',
    loading: true
  };

  componentDidMount() {
    // console.log("data",this.props.data)
    this.setState({
      content:this.props.draft.content
    })
  }

  editorChange = (e) => {
    this.setState({content: e.target.getContent()});
  };

  validate = () => {
    if (this.state.content === "") {
      this.setGlobal({errorMsg: "No change in the content yet"});
      return false;
    }
    return true;
  };

  saveEdit = (id) => {
    this.validate();
    axios.post(UPDATE_DRAFT(id), {content: this.state.content})
        .then(res => {
          if (res.data.status) {
            this.setGlobal({successMsg: res.data.messages});
            this.props.onClose()
          }
          else this.setGlobal({errorMsg: res.data.messages});
        })
  };

  render() {
    const {draft, open, onClose} = this.props;
    const {errorMsg, successMsg} = this.state;

    const content =
        <>
          <Editor default={draft.content} onChange={this.editorChange} height={700}/>
        </>;

    const actions =
        <>
          <Button color="primary">Approve</Button>
          <Button color="primary" onClick={this.saveEdit.bind(this, draft.id)}>Update</Button>
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
  draft: PropTypes.any
};

export default withStyles(styles)(DraftSingleViewDialog);

