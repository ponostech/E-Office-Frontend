import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Snackbar,
  Tooltip,
  Typography
} from "@material-ui/core";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";

// USAGE
// <DocumentsDropzone documents={[
//   {name:"Signature of the applicant",fileName:"signature"},
//   {name:"NOC of landowner",fileName:"noc-landowner"},
//   {name:"Tribal Certificate",fileName:"tribal-certificate"},
// ]}
//                    openDialog={this.state.openDialog}
//                    onCloseHandler={this.handleDocumentClose.bind(this)}
//                    acceptedFiles={[...Constraint.ACCEPTED_IMAGES, ...Constraint.ACCEPTED_DOCUMENTS]}/>

class DocumentsDropzoneFragment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      maxDocError: "",
      docSize: 0
    };
  }

  isValid = () => {
    if (this.state.files.length === 0) {
      return false;
    }
    return this.props.documents.length === this.state.files.length;

  };
  getData = () => {
    return this.state;
  };

  componentWillReceiveProps(nextProps, nextContext) {
    const { documents } = nextProps;
    this.setState({ docSize: documents.length });
    for (let i = 0; i < documents.length; i++) {
      let attr = { found: false };
      documents[i] = { ...documents[i], ...attr };
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    // Do something with files
    const { documents } = this.props;
    const maxDoc = documents.length;
    let temp = [...this.state.files, ...acceptedFiles];
    let files = this.getUnique(temp, "name");

    let newFiles = [];
    documents.forEach(function(doc) {
      files.forEach(file => {
        let fname = file.name.substring(0, file.name.lastIndexOf("."));

        if (fname === doc.fileName) {
          newFiles.push(file);
          doc.found = true;
        }
      });
    });
    console.log(newFiles);
    this.setState({
      files: newFiles
    });
  };


  getUnique = (arr, comp) => {
    const unique = arr
      .map(e => e[comp])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e]);

    return unique;
  };

  handleItemDelete = (file) => {
    const { documents } = this.props;
    const files = this.state.files.filter(value => value.name !== file.name);
    this.setState({ files });
    let found = false;
    documents.forEach(function(item, i) {
      files.forEach(function(file, j) {
        let fname = file.name.substring(0, file.name.lastIndexOf("."));
        if (fname === item.fileName) {
          found = true;
        }
      });
      item.found = found;

    });
    if (found)
      this.setState({ files });
  };

  closeSnackBar = () => {
    this.setState({ maxDocError: "" });
  };

  render() {
    let { documents, acceptedFiles, ...rest } = this.props;

    const { files } = this.state;
    const view = (
      files.map(value => {
        return <ListItem key={value.name}>
          <ListItemText secondary={Math.round(value.size / 1024) + " Kb"} primary={value.name} color={"primary"}/>
          <ListItemSecondaryAction>
            <Tooltip title={"Click here to delete"}>
              <IconButton onClick={this.handleItemDelete.bind(this, value)}>
                <DeleteIcon color={"error"}/>
              </IconButton>
            </Tooltip>
          </ListItemSecondaryAction>
        </ListItem>;
      })
    );
    const docs = (
      documents.map(function(item, index) {
        return (
          <ListItem key={index}>
            <ListItemIcon>
              {item.found ? <CheckIcon color={"primary"}/> : <span>*</span>}
            </ListItemIcon>
            <ListItemText primary={item.name} secondary={"Required Filename : " + item.fileName}/>
          </ListItem>
        );

      })
    );
    return (
      <div>
        <Typography variant={"title"}>Required document<span>*</span></Typography>
        <List dense={true}>
          {docs}
        </List>
        <Dropzone accept={acceptedFiles} onDrop={this.onDrop} {...rest}>
          {({ getRootProps, getInputProps, isDragActive }) => {
            return (
              <div style={{ padding: 40, border: 5, background: "#f8f8f8" }}
                   {...getRootProps()}
                   className={classNames("dropzone", { "dropzone--isActive": isDragActive })}
              >
                <input {...getInputProps()} />
                {
                  isDragActive ?
                    <p>Drop files here...</p> :
                    <p>Try dropping some files here, or click to select files to upload.</p>
                }
              </div>
            );
          }}
        </Dropzone>
        <h5>List of selected files</h5>
        <List dense={true}>
          {view}
        </List>
        <Snackbar
          color={"error"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={Boolean(this.state.maxDocError)}
          autoHideDuration={5000}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.maxDocError}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.closeSnackBar}
            >
              <CloseIcon/>
            </IconButton>
          ]}
        />
      </div>

    );
  }
}

DocumentsDropzoneFragment.propTypes = {
  documents: PropTypes.array.isRequired,
  acceptedFiles: PropTypes.string.isRequired
};
export default DocumentsDropzoneFragment;